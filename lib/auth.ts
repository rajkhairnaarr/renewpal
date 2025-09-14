import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { supabase } from "./db"

export async function getCurrentUser() {
  const user = await currentUser()
  if (!user) return null
  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/sign-in")
  }
  return user
}

export async function getCurrentOrganization() {
  const user = await requireAuth()
  
  // Get user's organization from Clerk metadata or database
  const { data: memberships, error } = await supabase
    .from("organization_members")
    .select(`
      organization_id,
      organizations (
        id,
        name,
        slug,
        plan,
        settings
      )
    `)
    .eq("user_id", user.id)
    .single()

  if (error || !memberships) {
    return null
  }

  return memberships.organizations
}

export async function requireOrganization() {
  const organization = await getCurrentOrganization()
  if (!organization) {
    redirect("/onboarding")
  }
  return organization
}

export async function getUserOrganizations(userId: string) {
  const { data, error } = await supabase
    .from("organization_members")
    .select(`
      role,
      organizations (
        id,
        name,
        slug,
        plan,
        settings
      )
    `)
    .eq("user_id", userId)

  if (error) {
    console.error("Error fetching user organizations:", error)
    return []
  }

  return data || []
}

export async function checkUserPermission(
  userId: string,
  organizationId: string,
  requiredRole: "admin" | "member" | "viewer" = "viewer"
) {
  const { data, error } = await supabase
    .from("organization_members")
    .select("role")
    .eq("user_id", userId)
    .eq("organization_id", organizationId)
    .single()

  if (error || !data) {
    return false
  }

  const roleHierarchy = {
    admin: 3,
    member: 2,
    viewer: 1,
  }

  return roleHierarchy[data.role as keyof typeof roleHierarchy] >= roleHierarchy[requiredRole]
}

export async function requirePermission(
  organizationId: string,
  requiredRole: "admin" | "member" | "viewer" = "viewer"
) {
  const user = await requireAuth()
  const hasPermission = await checkUserPermission(user.id, organizationId, requiredRole)
  
  if (!hasPermission) {
    redirect("/dashboard")
  }
  
  return user
}

export async function createOrganization(userId: string, organizationData: {
  name: string
  slug: string
  plan?: string
}) {
  const { data: organization, error: orgError } = await supabase
    .from("organizations")
    .insert({
      name: organizationData.name,
      slug: organizationData.slug,
      plan: organizationData.plan || "free",
      settings: {
        timezone: "UTC",
        dateFormat: "MM/DD/YYYY",
        currency: "USD",
        defaultNotificationDays: [30, 7, 1],
        emailNotifications: true,
        smsNotifications: false,
      },
    })
    .select()
    .single()

  if (orgError) {
    throw new Error(`Failed to create organization: ${orgError.message}`)
  }

  // Add user as admin to the organization
  const { error: memberError } = await supabase
    .from("organization_members")
    .insert({
      organization_id: organization.id,
      user_id: userId,
      role: "admin",
      permissions: {
        canManageRenewals: true,
        canManageMembers: true,
        canViewAnalytics: true,
        canManageBilling: true,
      },
    })

  if (memberError) {
    throw new Error(`Failed to add user to organization: ${memberError.message}`)
  }

  return organization
}

export async function addOrganizationMember(
  organizationId: string,
  userId: string,
  role: "admin" | "member" | "viewer" = "member"
) {
  const { error } = await supabase
    .from("organization_members")
    .insert({
      organization_id: organizationId,
      user_id: userId,
      role,
      permissions: {
        canManageRenewals: role === "admin" || role === "member",
        canManageMembers: role === "admin",
        canViewAnalytics: true,
        canManageBilling: role === "admin",
      },
    })

  if (error) {
    throw new Error(`Failed to add member: ${error.message}`)
  }
}

export async function removeOrganizationMember(
  organizationId: string,
  userId: string
) {
  const { error } = await supabase
    .from("organization_members")
    .delete()
    .eq("organization_id", organizationId)
    .eq("user_id", userId)

  if (error) {
    throw new Error(`Failed to remove member: ${error.message}`)
  }
}

export async function updateOrganizationMemberRole(
  organizationId: string,
  userId: string,
  role: "admin" | "member" | "viewer"
) {
  const { error } = await supabase
    .from("organization_members")
    .update({
      role,
      permissions: {
        canManageRenewals: role === "admin" || role === "member",
        canManageMembers: role === "admin",
        canViewAnalytics: true,
        canManageBilling: role === "admin",
      },
    })
    .eq("organization_id", organizationId)
    .eq("user_id", userId)

  if (error) {
    throw new Error(`Failed to update member role: ${error.message}`)
  }
}

// Middleware helper for API routes
export async function withAuth(handler: Function) {
  return async (req: Request) => {
    const user = await requireAuth()
    return handler(req, user)
  }
}

export async function withOrganization(handler: Function) {
  return async (req: Request) => {
    const user = await requireAuth()
    const organization = await getCurrentOrganization()
    
    if (!organization) {
      return new Response(JSON.stringify({ error: "Organization not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }
    
    return handler(req, user, organization)
  }
} 