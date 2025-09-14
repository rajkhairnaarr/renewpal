import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Email templates
export const EmailTemplates = {
  // Welcome email
  WELCOME: (user: { name: string; email: string }) => ({
    from: 'RenewalPal <noreply@renewalpal.com>',
    to: user.email,
    subject: 'Welcome to RenewalPal! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to RenewalPal!</h1>
        <p>Hi ${user.name},</p>
        <p>Welcome to RenewalPal! We're excited to help you never miss a renewal again.</p>
        <p>Here's what you can do to get started:</p>
        <ul>
          <li>Add your first renewal</li>
          <li>Invite team members</li>
          <li>Set up notifications</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Get Started</a>
      </div>
    `
  }),

  // Renewal reminder
  RENEWAL_REMINDER: (renewal: { name: string; expiry_date: string; value: number }, user: { name: string; email: string }) => ({
    from: 'RenewalPal <notifications@renewalpal.com>',
    to: user.email,
    subject: `Renewal Reminder: ${renewal.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Renewal Reminder</h2>
        <p>Hi ${user.name},</p>
        <p>This is a friendly reminder that your renewal is due soon:</p>
        <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h3>${renewal.name}</h3>
          <p><strong>Expires:</strong> ${renewal.expiry_date}</p>
          <p><strong>Value:</strong> $${renewal.value.toLocaleString()}</p>
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/renewals" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Renewal</a>
      </div>
    `
  }),

  // Team invitation
  TEAM_INVITATION: (inviter: { name: string }, invitee: { email: string }, organization: { name: string }) => ({
    from: 'RenewalPal <team@renewalpal.com>',
    to: invitee.email,
    subject: `You've been invited to join ${organization.name} on RenewalPal`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Team Invitation</h2>
        <p>Hi there,</p>
        <p>${inviter.name} has invited you to join <strong>${organization.name}</strong> on RenewalPal.</p>
        <p>RenewalPal helps teams track and manage renewals, ensuring you never miss important deadlines.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/sign-up" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Accept Invitation</a>
      </div>
    `
  }),

  // Weekly digest
  WEEKLY_DIGEST: (user: { name: string; email: string }, data: { upcoming: number; overdue: number; total_value: number }) => ({
    from: 'RenewalPal <digest@renewalpal.com>',
    to: user.email,
    subject: 'Your RenewalPal Weekly Digest',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Weekly Renewal Digest</h2>
        <p>Hi ${user.name},</p>
        <p>Here's your weekly renewal summary:</p>
        <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p><strong>Upcoming Renewals:</strong> ${data.upcoming}</p>
          <p><strong>Overdue Renewals:</strong> ${data.overdue}</p>
          <p><strong>Total Value:</strong> $${data.total_value.toLocaleString()}</p>
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Dashboard</a>
      </div>
    `
  }),

  // Payment confirmation
  PAYMENT_CONFIRMATION: (user: { name: string; email: string }, subscription: { plan: string; amount: number }) => ({
    from: 'RenewalPal <billing@renewalpal.com>',
    to: user.email,
    subject: 'Payment Confirmation - RenewalPal',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #059669;">Payment Confirmed</h2>
        <p>Hi ${user.name},</p>
        <p>Thank you for your payment! Your subscription has been activated.</p>
        <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p><strong>Plan:</strong> ${subscription.plan}</p>
          <p><strong>Amount:</strong> $${subscription.amount}</p>
        </div>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Access Dashboard</a>
      </div>
    `
  })
}

// Email sending functions
export const sendEmail = async (template: any) => {
  try {
    const { data, error } = await resend.emails.send(template)
    if (error) {
      console.error('Email sending failed:', error)
      return { success: false, error }
    }
    return { success: true, data }
  } catch (error) {
    console.error('Email sending error:', error)
    return { success: false, error }
  }
}

// Specific email functions
export const sendWelcomeEmail = async (user: { name: string; email: string }) => {
  return sendEmail(EmailTemplates.WELCOME(user))
}

export const sendRenewalReminder = async (
  renewal: { name: string; expiry_date: string; value: number }, 
  user: { name: string; email: string }
) => {
  return sendEmail(EmailTemplates.RENEWAL_REMINDER(renewal, user))
}

export const sendTeamInvitation = async (
  inviter: { name: string }, 
  invitee: { email: string }, 
  organization: { name: string }
) => {
  return sendEmail(EmailTemplates.TEAM_INVITATION(inviter, invitee, organization))
}

export const sendWeeklyDigest = async (
  user: { name: string; email: string }, 
  data: { upcoming: number; overdue: number; total_value: number }
) => {
  return sendEmail(EmailTemplates.WEEKLY_DIGEST(user, data))
}

export const sendPaymentConfirmation = async (
  user: { name: string; email: string }, 
  subscription: { plan: string; amount: number }
) => {
  return sendEmail(EmailTemplates.PAYMENT_CONFIRMATION(user, subscription))
} 