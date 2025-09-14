import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/api/webhooks(.*)",
    "/pricing",
    "/about",
    "/contact",
    "/blog(.*)",
    "/docs(.*)",
  ],
  
  // Routes that can be accessed while signed out, but also show user content when signed in
  ignoredRoutes: [
    "/api/webhooks(.*)",
  ],
  
  // Routes that will always be public
  afterAuth(auth, req) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return Response.redirect(new URL("/sign-in", req.url))
    }
    
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return
    }
    
    // Allow users visiting public routes to access them
    return
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
} 