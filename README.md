# Tinashe Mundieta - Full-Stack Software Developer Portfolio

A modern, professional portfolio website built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and SQLite (local) / PostgreSQL (production).

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Analytics**: Vercel Analytics & Speed Insights
- **Forms**: React Hook Form + Zod validation

## Features

- Responsive dark-mode glassmorphism design
- Dynamic content management with Prisma + database
- Functional contact form with backend storage
- Admin dashboard for managing content
- Blog section with dynamic posts
- Project portfolio with database-backed content
- Certificate showcase
- SEO optimized with metadata
- PWA-ready

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Tinashe623/my-portfolio.git
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Update the `.env` file with your configuration.

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio

## Admin Dashboard

Access the admin dashboard at `/admin/login` with credentials:
- Email: `admin@tinashemundieta.com`
- Password: `admin123`

**⚠️ Change these credentials in production!**

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Set up a Neon PostgreSQL database
4. Add environment variables in Vercel:
   - `DATABASE_URL` - Your Neon PostgreSQL connection string
   - `NEXTAUTH_SECRET` - A secure random string
   - `NEXTAUTH_URL` - Your production URL
   - `RESEND_API_KEY` - For contact form emails (optional)
   - `CONTACT_EMAIL` - Your email address
5. Deploy!

### Database Migration to PostgreSQL

To switch from SQLite to PostgreSQL:

1. Update `prisma/schema.prisma`:
   - Change `provider = "sqlite"` to `provider = "postgresql"`
   - Add back `@db.Text` and `String[]` types

2. Update `.env`:
   - Set `DATABASE_URL` to your PostgreSQL connection string

3. Run migrations:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

## Project Structure

```
src/
├── app/
│   ├── (routes)/           # Route group for public pages
│   │   ├── home/
│   │   ├── about/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── contact/
│   │   ├── resume/
│   │   ├── certificates/
│   │   ├── blog/
│   │   └── admin/
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── common/             # Reusable components
│   ├── layout/             # Header, Footer
│   └── sections/           # Page sections
├── lib/
│   ├── prisma.ts           # Prisma client
│   └── auth.ts             # Auth utilities
└── types/                  # TypeScript types
```

## License

MIT
