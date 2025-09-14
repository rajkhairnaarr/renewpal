# RenewalPal - SaaS Renewal Management Platform

A comprehensive SaaS application for tracking and managing business renewals (licenses, subscriptions, contracts, etc.) built with Next.js 14, Supabase, and Clerk.

## 🚀 Features

### Core Features
- **Multi-tenant Architecture**: Organizations with role-based permissions
- **Renewal Management**: CRUD operations with smart categorization
- **Smart Notifications**: Multi-channel alerts (email, SMS, in-app, Slack)
- **Dashboard Analytics**: Real-time insights and reporting
- **Team Collaboration**: Role-based access and team management
- **File Attachments**: Document storage for renewals
- **Calendar Integration**: Google Calendar sync
- **AI-Powered Features**: Smart categorization and notification timing

### Authentication & Security
- **Clerk Authentication**: Social login, SSO, enterprise features
- **Role-based Permissions**: Admin, Member, Viewer roles
- **Data Encryption**: At-rest and in-transit encryption
- **GDPR Compliance**: Data export, deletion, consent management
- **SOC 2 Ready**: Audit logging and access controls

### Subscription & Billing
- **Freemium Model**: Free (5 renewals) → Pro ($15/mo) → Team ($49/mo)
- **Stripe Integration**: Secure payment processing
- **Usage Analytics**: Track API usage and storage
- **Billing Portal**: Customer self-service

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Clerk
- **UI Framework**: Shadcn/UI + Tailwind CSS
- **Payments**: Stripe Connect
- **Email**: Resend
- **AI Integration**: OpenAI GPT-4
- **State Management**: Zustand
- **Validation**: Zod schemas
- **Testing**: Vitest + Testing Library
- **Monitoring**: Sentry

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Clerk account
- Stripe account (for payments)
- Resend account (for email)

## 🎨 Figma MCP Integration

RenewPal includes a Figma MCP (Model Context Protocol) integration for design-to-code workflows.

### Testing the Integration

```bash
npm run figma:test
```

### Starting the Figma MCP Server

```bash
npm run figma:start
```

For more details, see [Figma MCP Integration Documentation](docs/figma-mcp-integration.md).

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/your-username/renewalpal.git
cd renewalpal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and fill in your credentials:

```bash
cp env.example .env.local
```

Required environment variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-clerk-publishable-key
CLERK_SECRET_KEY=sk_test_your-clerk-secret-key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Stripe Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-stripe-webhook-secret

# Email (Resend)
RESEND_API_KEY=re_your-resend-api-key
FROM_EMAIL=noreply@renewalpal.com

# AI (OpenAI)
OPENAI_API_KEY=sk-your-openai-api-key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Set up the database

Run the database migrations:

```bash
npm run db:push
```

Generate TypeScript types:

```bash
npm run db:generate
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── dashboard/         # Main app routes
│   ├── api/              # API endpoints
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── dashboard/        # Dashboard components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
│   ├── auth.ts           # Authentication utilities
│   ├── db.ts             # Database client
│   ├── validations.ts    # Zod schemas
│   └── utils.ts          # Common utilities
├── hooks/                # Custom React hooks
├── store/                # Zustand stores
├── types/                # TypeScript types
└── tests/                # Test files
```

## 🗄️ Database Schema

### Core Tables

- **organizations**: Multi-tenant organizations
- **organization_members**: User-organization relationships
- **renewals**: Main renewal records
- **notifications**: Notification tracking
- **audit_logs**: Security audit trail
- **files**: File attachments
- **subscriptions**: Billing information

### Key Relationships

- Users belong to organizations through `organization_members`
- Renewals belong to organizations
- Notifications are linked to renewals and users
- Files are attached to renewals

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Testing
npm run test             # Run tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Run tests with coverage

# Database
npm run db:generate      # Generate TypeScript types
npm run db:push          # Push schema changes
npm run db:reset         # Reset database

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript check
npm run format           # Format code with Prettier
```

### Adding New Features

1. **Create API endpoints** in `app/api/`
2. **Add validation schemas** in `lib/validations.ts`
3. **Create UI components** in `components/`
4. **Add tests** in `tests/`
5. **Update types** in `types/`

### Database Changes

1. **Create migration** in Supabase dashboard
2. **Update types**: `npm run db:generate`
3. **Update validation schemas**
4. **Add tests** for new functionality

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- **Unit tests**: Individual component/function tests
- **Integration tests**: API endpoint tests
- **E2E tests**: Full user flow tests

## 🚀 Deployment

### Vercel Deployment

1. **Connect repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

### Environment Setup

- **Development**: Local Supabase, Stripe test mode
- **Staging**: Full integration testing
- **Production**: Optimized for performance

### Database Migrations

- **Automatic**: Vercel handles migrations
- **Manual**: Run `npm run db:push` if needed

## 📊 Monitoring & Analytics

### Error Tracking
- **Sentry**: Error monitoring and performance tracking
- **Custom logging**: Structured logging with correlation IDs

### Analytics
- **PostHog**: User behavior analytics
- **Custom events**: Feature usage tracking

### Performance
- **Core Web Vitals**: Lighthouse monitoring
- **Database**: Query performance monitoring

## 🔒 Security

### Authentication
- **Clerk**: Enterprise-grade authentication
- **SSO**: SAML/OAuth support
- **MFA**: Multi-factor authentication

### Data Protection
- **Encryption**: At-rest and in-transit
- **Access Control**: Role-based permissions
- **Audit Logging**: Complete activity trail

### Compliance
- **GDPR**: Data export, deletion, consent
- **SOC 2**: Security controls and monitoring
- **Privacy**: No data sharing with third parties

## 🤝 Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Add** tests for new functionality
5. **Submit** a pull request

### Code Standards

- **TypeScript**: Strict mode, proper typing
- **ESLint**: Code quality rules
- **Prettier**: Consistent formatting
- **Testing**: 80%+ coverage target

### Commit Convention

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: add or update tests
chore: maintenance tasks
```

## 📈 Performance

### Optimization Strategies

- **Code Splitting**: Lazy load components
- **Image Optimization**: Next.js Image component
- **Caching**: React Query for data caching
- **Bundle Analysis**: Monitor bundle size

### Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.8s

## 🆘 Support

### Documentation
- **API Docs**: `/api/docs` (when implemented)
- **User Guide**: In-app help system
- **Developer Docs**: This README

### Getting Help
- **Issues**: GitHub issues for bugs
- **Discussions**: GitHub discussions for questions
- **Email**: support@renewalpal.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/UI**: Beautiful component library
- **Clerk**: Authentication platform
- **Supabase**: Database and backend
- **Vercel**: Deployment platform
- **Next.js**: React framework

---

**RenewalPal** - Never miss a renewal again! 🚀 