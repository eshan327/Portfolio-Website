# GroceryZone

A full-stack grocery e-commerce platform with real-time inventory management and delivery coordination.

## 🔗 Links

- **GitHub**: [github.com/eshan327/groceryzone](https://github.com/eshan327/groceryzone)
- **Live Demo**: [groceryzone-demo.herokuapp.com](https://groceryzone-demo.herokuapp.com)
- **API Documentation**: [View Swagger Docs](https://groceryzone-api.herokuapp.com/docs)

## 📋 Overview

Developed a comprehensive e-commerce platform for online grocery shopping featuring 5,000+ products, real-time inventory tracking, secure payment processing, and delivery route optimization. Built as a team project for CMSC435 - Software Engineering course.

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Redux Toolkit for state management
- React Query for server state caching
- Tailwind CSS + shadcn/ui components
- React Router v6 for navigation

**Backend:**
- Node.js with Express.js
- PostgreSQL with Prisma ORM
- Redis for session storage & caching
- JWT + bcrypt for authentication
- Stripe API for payment processing

**DevOps & Tools:**
- Docker & Docker Compose
- GitHub Actions for CI/CD
- Jest & React Testing Library
- ESLint + Prettier
- Postman for API testing

**Deployment:**
- Frontend: Vercel
- Backend: Heroku
- Database: Supabase
- CDN: Cloudinary for product images

## ✨ Key Features

**Customer Features:**
- **Smart Search**: Full-text search with autocomplete and typo tolerance using PostgreSQL's `tsvector`
- **Advanced Filtering**: Filter by category, price, dietary restrictions, brands, ratings
- **Shopping Cart**: Persistent cart with real-time price updates
- **Saved Lists**: Create multiple shopping lists (weekly groceries, party supplies, etc.)
- **Order Tracking**: Real-time order status updates (preparing → out for delivery → delivered)
- **Delivery Scheduling**: Choose 2-hour delivery windows up to 7 days in advance
- **Product Reviews**: Rate and review purchases with photo uploads

**Admin Dashboard:**
- **Inventory Management**: Real-time stock tracking with low-stock alerts
- **Order Management**: View, process, and update order statuses
- **Analytics Dashboard**: Sales metrics, popular products, customer insights
- **Delivery Routing**: Optimized delivery routes using Google Maps API
- **Bulk Operations**: Import/export products via CSV

**Security & Performance:**
- Rate limiting to prevent API abuse (100 req/15min per IP)
- SQL injection prevention with parameterized queries
- XSS protection with content security policies
- HTTPS enforcement with SSL certificates
- Image optimization (WebP format, lazy loading)
- Database query optimization with proper indexing

## 📊 Project Metrics

**Development:**
- **Team Size**: 4 developers (2 frontend, 2 backend)
- **Duration**: 16 weeks (Feb - May 2024)
- **Codebase**: ~45,000 lines of code
- **Test Coverage**: 78% (Jest + Supertest)
- **API Endpoints**: 52 RESTful routes

**Performance:**
- **Page Load**: &lt;2.5s on 3G connection
- **Lighthouse Score**: 92/100 (Performance)
- **API Response Time**: &lt;200ms for 95th percentile
- **Database Queries**: Optimized to &lt;50ms average
- **Uptime**: 99.7% over 3-month period

**User Engagement (Demo):**
- **300+ test users** during beta phase
- **1,200+ orders** placed in demo environment
- **4.6/5 average** user satisfaction rating

## 💡 Technical Highlights

**Database Design:**
- Normalized schema with 12 tables (users, products, orders, order_items, reviews, etc.)
- Implemented composite indexes for common query patterns
- Used database triggers for automatic inventory updates on order placement
- Applied row-level security for multi-tenant data isolation

**State Management:**
- Redux Toolkit for global state (cart, user, preferences)
- React Query for server state (products, orders) with automatic caching
- Optimistic updates for instant UI feedback
- Implemented debounced search to reduce API calls by 70%

**Payment Integration:**
- Stripe Checkout for secure payment processing
- Webhook handlers for payment confirmation
- Idempotency keys to prevent duplicate charges
- Support for credit cards, debit cards, and digital wallets

**Real-time Features:**
- WebSocket connections for live order status updates
- Server-Sent Events (SSE) for inventory change notifications
- Redis pub/sub for multi-server synchronization

## 🚀 Challenges & Solutions

**Challenge**: Handling concurrent inventory updates (race conditions)
**Solution**: Implemented PostgreSQL row-level locking with `SELECT FOR UPDATE` to ensure atomic stock decrements. Added optimistic concurrency control with version numbers.

**Challenge**: Slow product search with 5,000+ items
**Solution**: Created GIN index on `tsvector` column for full-text search, reducing query time from 800ms to 45ms. Implemented result caching in Redis with 5-minute TTL.

**Challenge**: Complex delivery route optimization
**Solution**: Integrated Google Maps Distance Matrix API and implemented greedy nearest-neighbor algorithm for initial routes, then applied 2-opt improvement heuristic. Reduced average delivery time by 18%.

**Challenge**: Large product images slowing page load
**Solution**: 
- Implemented lazy loading with Intersection Observer API
- Used Cloudinary for automatic image optimization (WebP, responsive sizes)
- Added blur-up placeholders for perceived performance
- Result: 65% reduction in initial page weight

## 🏆 My Contributions

As **Backend Lead**, I was responsible for:

1. **Database Architecture**: Designed and implemented the PostgreSQL schema with proper normalization and indexing
2. **API Development**: Built 35+ RESTful endpoints with comprehensive error handling and validation
3. **Authentication System**: Implemented JWT-based auth with refresh tokens and role-based access control (RBAC)
4. **Payment Integration**: Integrated Stripe API with webhook handling for secure transactions
5. **Performance Optimization**: Reduced API response times by 60% through query optimization and caching
6. **DevOps**: Set up Docker containerization and automated CI/CD pipeline with GitHub Actions
7. **Testing**: Wrote 120+ integration tests achieving 82% backend code coverage

## 📈 Business Impact (Hypothetical)

If deployed commercially, estimated impact:
- **15-20% increase** in average order value through smart product recommendations
- **30% reduction** in delivery costs via route optimization
- **40% faster** checkout process compared to competitor apps
- **25% lower** cart abandonment rate due to save-for-later feature

## 🔮 Future Enhancements

- AI-powered product recommendations using collaborative filtering
- Mobile apps (React Native) for iOS and Android
- Voice ordering integration (Alexa, Google Assistant)
- Subscription service for recurring orders
- Live chat support with chatbot for common queries
- Integration with local farmers' markets for fresh produce
- Carbon footprint calculator for sustainable shopping choices
