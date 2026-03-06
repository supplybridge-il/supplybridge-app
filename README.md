# SupplyBridge IL

### The B2B Trade Operating System for Israel

**Connecting Suppliers · Importers · Manufacturers** 

SupplyBridge IL is a specialized B2B digital marketplace designed to act as the structured visibility and coordination layer for Israel's local supply chain. It eliminates the fragmentation of WhatsApp groups and Excel sheets by providing a single source of truth for inventory and orders.

---

## 🚀 Product Vision

* **Mission**: To digitize and organize B2B trade flows in Israel by providing a data-rich platform for inventory management and order coordination.


* **The Strategy**: A "No Payment Processing" model to ensure zero regulatory burden, faster adoption, and zero chargeback risk.


* **The Moat**: Every interaction is logged to create a proprietary AI dataset for demand forecasting and supply chain optimization.



## 🛠 Tech Stack

* **Framework**: Next.js (App Router) with TypeScript 


* **Database**: MongoDB Atlas with Mongoose 


* **Auth**: NextAuth.js (JWT Strategy) + Upstash Redis 


* **Media**: Cloudinary CDN 


* **Search**: MongoDB Atlas Search (Lucene) with Hebrew support 


* **Styling**: Tailwind CSS + shadcn/ui 



## 🏗 Architecture Principles

* **Strict File Limits**: Each file is enforced to be $\le$ 60 lines to ensure modularity and maintainability.


* **Role-Based Access**: Specialized dashboards for Suppliers, Importers, Manufacturers, and Admins.


* **Freemium Model**: Core trade functionality is free; advanced AI insights and analytics are premium-gated.



## 🌿 Git Branching Strategy

Since this is a Free Tier repository, we manually enforce the following discipline:

* `main`: Production-ready code only.


* `develop`: The primary integration branch for features.


* `feature/[ticket]-[slug]`: Individual feature development.


* **PR Rule**: All merges to `main` require a successful build and manual review.



## 🚦 Getting Started

1. **Clone the repo**: `git clone https://github.com/supplybridge-il/supplybridge-app.git`

2. **Install dependencies**: `npm install` 

3. **Setup Environment**: Copy `.env.example` to `.env.local` and fill in your keys.

4. **Run Dev**: `npm run dev`

---
