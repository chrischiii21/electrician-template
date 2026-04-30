# ElecTrade - Professional Electrical Services Template

ElecTrade is a high-performance, modern, and conversion-optimized website template built specifically for electrical contractors and trade businesses. It is engineered using [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com), offering lightning-fast static site generation (SSG), pristine SEO, and a robust component-based architecture.

## 🚀 Technologies

* **Framework:** [Astro](https://astro.build/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Runtime & Package Manager:** [Bun](https://bun.sh/)
* **Language:** TypeScript / HTML / Astro

## ✨ Key Features

* **Modular Architecture:** Fully component-driven UI with reusable foundational components like buttons, cards, headings, containers, and grids (`src/components/ui/`).
* **Conversion-Optimized Landing Pages:** Pre-built, high-converting sections for Heroes, Trust Bars, Financing & Maintenance Plans, Us vs. Them Comparisons, Service Grids, Testimonials, and FAQs (`src/components/sections/`).
* **Sharp, Industrial Aesthetic:** A highly customized dark-first aesthetic leveraging sharp corners, dynamic shadows, vibrant accents, and clean typography to instantly communicate professional trust and reliability.
* **Content-Driven Data:** Utilizes local markdown files (`src/content/`) to drive dynamic features like FAQs, Service Areas, Financing Plans, and Footer Links—effectively separating content from design.
* **Local SEO Pages:** Dedicated structural landing page templates for local service areas (e.g., Los Angeles, San Diego) utilizing dynamic FAQ/content injection for maximum local search ranking.
* **Smooth Micro-Interactions:** Integrated custom intersection observers to orchestrate buttery-smooth, staggered entrance animations as the user scrolls.

## 📁 Project Structure

```text
/
├── public/                 # Static assets (images, icons, robots.txt)
├── src/
│   ├── components/
│   │   ├── sections/       # Complex, full-width page sections (Hero, FAQ, WhyUs)
│   │   └── ui/             # Reusable, atomic UI components (Button, Card, Badge)
│   ├── content/            # Markdown files acting as the data source for the site
│   ├── layouts/            # Base HTML wrapper and global structural layouts
│   └── pages/              # Astro file-based routing directory
│       ├── commercial/     # Commercial service landing pages
│       ├── service-area/   # Location-based SEO landing pages
│       ├── specialty/      # Specialty electrical service pages
│       └── index.astro     # Main homepage
├── package.json            # Project metadata and dependencies
└── tsconfig.json           # TypeScript configuration
```

## 🧞 Commands

This project utilizes [Bun](https://bun.sh) as its incredibly fast package manager and runtime. Run all commands from the root of the project:

| Command | Action |
| :--- | :--- |
| `bun install` | Installs dependencies |
| `bun run dev` | Starts the local development server at `localhost:4321` |
| `bun run build` | Builds your production-ready static site to `./dist/` |
| `bun run preview` | Previews your local production build before deploying |
| `bun run astro ...` | Run Astro CLI commands like `astro check` |

## 🎨 Design System

The template explicitly focuses on a "sharp-edges" modern aesthetic tailored for the trades:
* **Industrial Corners:** Card and container components are strictly configured with `rounded-none` to enforce a clean, structured, and industrial look.
* **Color Palette:** Leverages a deep, dark `background` paired with high-contrast `primary` (slate/navy) and a hyper-vibrant `accent` (amber/orange) to intuitively guide the user's eye toward critical calls to action.
* **Fully Responsive:** Strict mobile-first Tailwind implementation ensures the UI looks flawless on desktops, tablets, and phones.
