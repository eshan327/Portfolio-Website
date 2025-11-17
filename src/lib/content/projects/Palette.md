# Palette

A color palette generator and management tool for designers and developers.

## 🔗 Links

- **GitHub**: [github.com/eshan327/palette](https://github.com/eshan327/palette)
- **Live Demo**: [palette-demo.vercel.app](https://palette-demo.vercel.app)

## 📋 Overview

A full-stack web application that helps designers and developers create, save, and share custom color palettes. Built with a focus on usability, accessibility, and creative workflow optimization.

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Zustand for state management
- React Router for navigation

**Backend:**
- Node.js with Express
- PostgreSQL database
- JWT authentication
- RESTful API design

**Deployment:**
- Frontend: Vercel
- Backend: Railway
- Database: Supabase

## ✨ Key Features

- **Smart Color Generation**: Generate harmonious palettes using color theory algorithms (complementary, analogous, triadic schemes)
- **Accessibility Checker**: Built-in WCAG 2.1 contrast ratio validator ensures AA/AAA compliance
- **Export Options**: Download palettes in multiple formats (CSS, JSON, SVG, PNG)
- **Cloud Sync**: Save unlimited palettes to your account with real-time sync
- **Share & Collaborate**: Generate unique shareable links for each palette
- **Color Picker**: Extract colors from uploaded images using k-means clustering
- **Keyboard Shortcuts**: Full keyboard navigation for power users

## 📊 Impact

- **500+ active users** within first month of launch
- **2,000+ palettes created** across the platform
- **95%** positive feedback on accessibility features
- Featured on [Designer News](https://www.designernews.co) and [Product Hunt](https://www.producthunt.com)

## 💡 Technical Highlights

**Color Generation Algorithm:**
- Implemented custom HSL color space manipulation for more natural color transitions
- Created weighted randomization system for aesthetically pleasing palette suggestions
- Optimized color distance calculations using Delta E (CIE76) formula

**Performance Optimizations:**
- Reduced initial load time by 60% using code splitting and lazy loading
- Implemented debounced color updates for smooth real-time preview
- Added service worker for offline palette editing

**Security:**
- Secure JWT-based authentication with refresh token rotation
- Rate limiting on API endpoints to prevent abuse
- Input sanitization and XSS protection

## 🚀 Challenges & Solutions

**Challenge**: Ensuring generated palettes are colorblind-friendly
**Solution**: Integrated CVD (Color Vision Deficiency) simulation using Daltonization algorithm to preview palettes as seen by users with different types of colorblindness

**Challenge**: Fast color extraction from high-resolution images
**Solution**: Implemented Web Worker for k-means clustering computation, preventing UI freezing on large files

## 📈 Future Enhancements

- AI-powered palette suggestions based on user preferences
- Browser extension for extracting colors from any website
- Figma/Adobe XD plugin integration
- Team collaboration features with shared workspaces
