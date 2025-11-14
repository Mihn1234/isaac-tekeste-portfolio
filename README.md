# Isaac Tekeste - AI & Fintech Innovation Consultant Portfolio

> Enterprise-level consulting portfolio with HubSpot CRM integration, advanced lead scoring, and multi-language support

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://same-x47r7eg456f-latest.netlify.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

## 🌐 Live Website

**[Visit Isaac Tekeste Portfolio →](https://same-x47r7eg456f-latest.netlify.app)**

---

## ✨ Features

### 🎯 Enterprise CRM Integration
- **HubSpot CRM Integration** - Automatic lead capture from all forms
- **Advanced Lead Scoring** - Points-based system (5-50 points per action)
- **Automated Email Sequences** - Behavioral trigger-based nurturing
- **UTM Tracking** - Full lead attribution and source tracking
- **Lead Lifecycle Management** - From subscriber to customer

### 🔐 Gated Premium Content
- **Tiered Resources** - Free (0 pts) to Premium (35+ pts required)
- **Lead Capture Forms** - Enhanced qualification fields
- **Download Analytics** - Track engagement and conversions
- **Score-based Access** - Higher scores unlock premium content

### 💬 Advanced Engagement Tools
- **Live Chat Widget** - Integrated with Calendly booking
- **Multi-mode Chat** - Chat and booking consultation modes
- **Newsletter Signup** - With lead scoring integration
- **Contact Forms** - Professional multi-step forms

### 🌍 Multi-language Support
- **6 Languages** - English, Spanish, French, German, Italian, Portuguese
- **Translation Context** - React context-based i18n
- **Language Switcher** - Compact and full variants
- **Localized Content** - All sections fully translated

### 📊 Analytics & Tracking
- **Google Analytics 4** - Enhanced event tracking
- **LinkedIn Insight Tag** - B2B conversion tracking
- **Facebook Pixel** - Lead generation events
- **Hotjar** - Heatmaps and user behavior analysis
- **Custom Event Tracking** - Newsletter, downloads, bookings

### 🎨 Professional Design
- **Custom IT Logo** - Professional brand identity
- **shadcn/ui Components** - Modern, accessible UI
- **Responsive Design** - Mobile-first approach
- **Animations & Transitions** - Smooth user experience
- **Teal/Cyan Color Scheme** - Professional fintech branding

---

## 🚀 Tech Stack

### Framework & Core
- **Next.js 15.3.2** - React framework with App Router
- **React 19** - Latest React with TypeScript
- **TypeScript 5.0** - Type-safe development
- **Bun** - Fast package manager and runtime

### Styling & UI
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library

### Forms & Validation
- **React Hook Form** - Performant form management
- **Zod** - TypeScript-first schema validation

### Deployment & Hosting
- **Netlify** - Static site hosting with global CDN
- **GitHub** - Version control and collaboration

---

## 📁 Project Structure

```
isaac-tekeste-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main homepage
│   │   ├── layout.tsx            # Root layout with SEO & analytics
│   │   ├── globals.css           # Global styles and animations
│   │   └── ClientBody.tsx        # Client-side body wrapper
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── NewsletterSignup.tsx  # Newsletter with lead scoring
│   │   ├── DownloadableResources.tsx  # Gated resources
│   │   ├── LiveChatCalendly.tsx  # Live chat widget
│   │   └── LanguageSwitcher.tsx  # Multi-language support
│   └── lib/
│       ├── hubspot.ts            # HubSpot CRM integration
│       └── utils.ts              # Utility functions
├── public/                       # Static assets
├── netlify.toml                  # Netlify deployment config
└── package.json                  # Dependencies
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Bun** - Install from [bun.sh](https://bun.sh)
- **Node.js 18+** (optional, Bun is preferred)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Mihn1234/isaac-tekeste-portfolio.git

# Navigate to project directory
cd isaac-tekeste-portfolio

# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# HubSpot CRM Integration
NEXT_PUBLIC_HUBSPOT_API_KEY=your_hubspot_api_key
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=GA_MEASUREMENT_ID
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=YOUR_PARTNER_ID
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=YOUR_PIXEL_ID
NEXT_PUBLIC_HOTJAR_ID=0000000

# Optional
NEXT_PUBLIC_CALENDLY_USERNAME=your_calendly_username
NEXT_PUBLIC_EMAIL_SERVICE_API_KEY=your_email_api_key
```

---

## 🎯 Lead Scoring System

### Points Allocation

| Action | Points | Lifecycle Stage |
|--------|--------|----------------|
| Newsletter Signup | +5 | Subscriber |
| Resource Download | +15 | Lead |
| Premium Resource | +25 | Marketing Qualified Lead |
| Consultation Booking | +50 | Sales Qualified Lead |
| Executive Title | +20 bonus | - |
| Company Provided | +10 bonus | - |

### Resource Access Levels

- **Free (0 pts)** - AI Banking Transformation Guide
- **Standard (15 pts)** - Voice Agents Playbook
- **Premium (25 pts)** - Risk Management Framework
- **Premium+ (35 pts)** - Mortgage Automation Case Study
- **Custom (75+ pts)** - Bespoke Research Reports

---

## 📈 Analytics Events

### Tracked Events
- `page_view` - Page navigation
- `newsletter_signup` - Email capture
- `resource_download` - Content download
- `consultation_booking` - Calendly booking
- `chat_message` - Live chat interaction
- `language_change` - Language switcher usage

### Conversion Tracking
- Lead score updates
- Form submissions
- Resource access attempts
- Booking confirmations

---

## 🌍 Supported Languages

1. **English (EN)** - Default
2. **Spanish (ES)** - Español
3. **French (FR)** - Français
4. **German (DE)** - Deutsch
5. **Italian (IT)** - Italiano
6. **Portuguese (PT)** - Português

All navigation, forms, CTAs, and content sections are fully translated.

---

## 🚀 Deployment

### Netlify Deployment

```bash
# Build the project
bun run build

# Deploy to Netlify (automatic via GitHub integration)
# Or use Netlify CLI:
netlify deploy --prod
```

### GitHub Pages (Alternative)

```bash
# Build static export
bun run build

# Deploy to GitHub Pages
# (Configure GitHub Pages to use the `out` directory)
```

---

## 📄 License

This project is proprietary and confidential. All rights reserved © Isaac Tekeste 2024

---

## 🤝 Contact

**Isaac Tekeste**
AI & Fintech Innovation Consultant

- 🌐 Website: [isaactekeste.co.uk](https://same-x47r7eg456f-latest.netlify.app)
- 📧 Email: isaac@isaactekeste.co.uk
- 💼 LinkedIn: [linkedin.com/in/isaactekeste](https://www.linkedin.com/in/isaactekeste/)
- 📱 TikTok: [@isaactekeste7](https://www.tiktok.com/@isaactekeste7)
- 📷 Instagram: [@isaac.tekeste](https://www.instagram.com/isaac.tekeste/)

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Deployed on [Netlify](https://www.netlify.com/)
- Generated with [Same](https://same.new)

---

**⭐ If you find this project useful, please consider giving it a star!**
