# FurnitureStore - Next.js E-commerce Platform

Modern furniture e-commerce platform built with Next.js 16, featuring product catalog, shopping cart, authentication, and blog functionality.

## 🎯 Project Overview

A full-stack furniture store application with:
- 📦 Product catalog with filtering and pagination
- 🛒 Shopping cart with Zustand state management
- 👤 User authentication and profiles
- 📝 Blog section with dynamic posts
- 🔍 Product search functionality
- 💳 Checkout with Telegram notifications
- 📱 Responsive design with Tailwind CSS

## 🏗️ Architecture

Project follows **Feature-Sliced Design** pattern:

```
src/
├── app/              # Next.js App Router pages & routes
├── entities/         # Business entities (Product, Cart, Post)
├── features/         # Feature modules (Search, Checkout, Cart)
├── shared/           # Shared utilities, types, API clients
└── widgets/          # Composite UI components
```

### Directory Structure

**Core Directories:**
- `src/app/` - Page routes and layouts
  - `auth/` - Login page
  - `reg/` - Registration page
  - `catalog/` - Product catalog
  - `product/[slug]/` - Product details
  - `cart/` - Shopping cart
  - `checkout/` - Checkout form
  - `blog/[slug]/` - Blog post details
  - `blogs/` - Blog listing
  - `contact/` - Contact page
  - `profile/` - User profile
  - `about/` - About page

- `src/entities/` - Core business entities
  - `cart/` - Cart entity with Zustand store
  - `product-card/` - Product card component
  - `post-card/` - Blog post card component

- `src/features/` - Feature modules
  - `cart/` - Add to cart functionality
  - `catalog/` - Category filter & pagination
  - `checkout/` - Order submission
  - `search/` - Product search modal
  - `logout-button/` - Authentication logout

- `src/shared/` - Shared resources
  - `api/` - Supabase client, server utilities
  - `icons/` - SVG icon components
  - `data/` - Mock data
  - `types/` - TypeScript types & interfaces
  - `lib/` - Utility functions

- `src/widgets/` - Complex UI components
  - `Header/` - Navigation header
  - `Footer/` - Footer component
  - `HeroSection/` - Hero banner
  - `ProductShowcase/` - Featured products
  - `ProductDetails/` - Product detail view
  - `BlogSection/` - Blog listing widget
  - `CartList/` - Cart items list
  - `TopPicks/` - Top rated products
  - `NewArrivals/` - New products
  - `Sidebar/` - Mobile navigation

## 🚀 Tech Stack

- **Framework:** Next.js 16.2.6
- **Runtime:** React 19.2.4, React DOM 19.2.4
- **State Management:** Zustand 5.0.14
- **Forms:** React Hook Form 7.77.0, Zod 4.4.3
- **Backend:** Supabase (@supabase/ssr, @supabase/supabase-js)
- **Styling:** Tailwind CSS 4, PostCSS
- **Icons:** Lucide React 1.17.0
- **Utilities:** usehooks-ts 3.1.1
- **Type Safety:** TypeScript 5

## 📋 Prerequisites

- Node.js 18+ (compatible with Next.js 16)
- npm or yarn
- Supabase account
- Telegram Bot Token (optional, for notifications)

## 🔧 Installation

```bash
# Clone repository
git clone <repository-url>

# Install dependencies
npm install

# Create .env.local with required variables
cp .env.example .env.local
```

## 🌍 Environment Variables

Create `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Telegram (optional)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## 📦 Available Scripts

```bash
# Development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🗄️ Database

SQLite database schema included in `database.sql` with:
- Products table
- Categories table
- Posts (blog) table
- Cart items table
- User profiles

Run migrations during Supabase setup.

## 📁 Key Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.js` | Tailwind CSS configuration |
| `src/proxy.ts` | Custom proxy configuration |
| `.gitignore` | Git ignore rules |
| `database.sql` | Database schema |

## 🎨 Features

### Authentication
- User registration and login
- Session management
- Protected routes

### Products
- Browse full catalog
- Filter by category
- Search functionality
- View product details
- Track new arrivals and top picks

### Shopping
- Add items to cart
- View cart summary
- Proceed to checkout
- Order confirmation via Telegram

### Blog
- Read furniture care tips
- View posts with details
- Navigate post collection

### User Profile
- View account information
- Manage preferences
- Access order history

## 🔌 API Integration

**Supabase:**
- PostgreSQL database backend
- Real-time subscriptions
- User authentication
- Row-level security (RLS)

**Telegram:**
- Order notifications sent to admin chat
- Uses Telegram Bot API

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS breakpoints (sm, md, lg, xl)
- Hamburger menu for mobile
- Touch-friendly interactions

## 🚦 Getting Started with Development

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Access application:**
   - Open http://localhost:3000
   - Test product browsing
   - Try authentication flow
   - Test cart functionality

3. **Modify pages:**
   - Edit files in `src/app/`
   - Page auto-updates during development

4. **Add features:**
   - Create new feature modules in `src/features/`
   - Use existing patterns for consistency

## 🔒 Security Considerations

- Environment variables for sensitive data
- Supabase RLS policies for database access
- XSS protection with React's built-in escaping
- CSRF protection via Next.js
- Secure session handling with Supabase SSR

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com)

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy directly from git
# Connect your GitHub repository to Vercel
# Environment variables are automatically synced
```

### Self-hosted
```bash
npm run build
npm start
```

## 📄 License

Private project

## 👤 Author

Recordline1

---

**Last Updated:** June 2026
**Version:** 0.1.0
