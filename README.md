# UTMCraft Pro - Campaign URL Architect & GA4 Toolkit

A modern, high-performance web application designed for digital marketers, growth engineers, and analytics professionals to build, audit, and manage standard UTM tracking parameters for marketing campaigns.

## ✨ Features

- **🚀 Single URL Builder**:
  - Live syntax-highlighted URL breakdown (`utm_source` in cyan, `utm_medium` in emerald, `utm_campaign` in amber, etc.).
  - Protocol auto-detection, whitespace trimming, and space replacement (`-`, `_`, `+`, `%20`).
  - Auto lowercase toggle to prevent split traffic rows in Google Analytics 4.
  - Safe preservation of non-UTM query parameters and URL fragment `#anchors`.
  - Dynamic custom query parameters (e.g. `ref`, `aff_id`, `partner`).
  - One-click copy with confetti celebration, test link launcher, and reset.

- **⚡ Multi-Channel Campaign Matrix (Bulk Generator)**:
  - Generate campaign links across 10+ channels (Google Ads, Meta, LinkedIn, X/Twitter, TikTok, Newsletter, Affiliate, etc.) simultaneously.
  - Multi-landing page support.
  - Table preview with individual row copy and one-click **"Copy All URLs"**.
  - Direct **"Download CSV"** export ready for Google Sheets, Excel, or ad managers.

- **🔍 UTM Inspector & Deconstructor**:
  - Paste any existing long URL to unpack and analyze each parameter.
  - Automated GA4 compliance audit detecting uppercase letters, unencoded spaces, missing core tags, and non-standard mediums.
  - One-click **"Open in Builder to Edit & Fix"** transfers inspected parameters into the single builder.

- **📱 Offline Dynamic QR Code Generator**:
  - High-resolution client-side canvas QR Code generation.
  - Instant **PNG Download** and clipboard image copy for print flyers, conference booths, and offline marketing.

- **📖 GA4 Taxonomy Guide & Golden Rules**:
  - Built-in reference for Google Analytics 4 default channel grouping definitions.
  - The 5 Golden Rules of UTM tracking.
  - Interactive standardized campaign naming formula builder (`[product]_[objective]_[geo]_[time]`).

- **🕒 Campaign History & Custom Presets**:
  - Automatic local logging of copied URLs into browser `localStorage`.
  - Search, re-open in builder, CSV/JSON export, and one-click clear.
  - Custom preset creation modal for saving your team's custom traffic channels.

- **🎨 Modern UX & Accessibility**:
  - Dark / Light mode toggle with smooth theme transition.
  - Keyboard shortcuts (`?` for shortcuts modal, `Cmd/Ctrl + Enter` to copy, `1-5` for tabs).
  - Modern form validation following web standards (`:user-valid` and `:user-invalid`).

---

## 🛠️ Development & Usage

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Open the development URL printed by Vite in your browser.

### 3. Build for production
```bash
npm run build
```
The compiled, production-ready static assets are written to the `dist/` directory.

### 4. Run tests
```bash
npm test
```

### 5. Deploy to Cloudflare

This project is pre-configured for both **Cloudflare Pages** (via GitHub) and **Cloudflare Workers (Static Assets)**.

#### Option A: Cloudflare Pages (Recommended with GitHub)
1. Go to **Cloudflare Dashboard** → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Select your repository (`utm`).
3. Set build configuration:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy! Cloudflare will automatically use Node 22 (via `.node-version`) and apply security/caching headers (via `public/_headers`).

#### Option B: Direct CLI Deploy (Cloudflare Workers)
```bash
npx wrangler deploy
```

---

## 📁 Project Structure

```
utm-builder/
├── index.html               # Main application layout and HTML structure
├── package.json             # Scripts & dependencies
├── wrangler.jsonc           # Cloudflare Workers static assets configuration
├── .node-version            # Pinned Node.js 22 runtime for build environments
├── public/
│   └── _headers             # Cloudflare security & asset caching headers
├── src/
│   ├── main.js              # Application controller & state coordination
│   ├── styles.css           # CSS custom properties, responsive layout & themes
│   └── modules/
│       ├── builder.js       # URL construction, sanitization & syntax highlighting
│       ├── presets.js       # Predefined channels & custom presets management
│       ├── batch.js         # Multi-channel matrix generator & CSV/TSV export
│       ├── inspector.js     # URL deconstructor & parser
│       ├── taxonomy.js      # GA4 channel groupings & UTM quality auditor
│       ├── qr.js            # QR code generation, PNG/SVG export & clipboard
│       └── history.js       # LocalStorage campaign history & export
└── tests/
    └── utm.test.js          # Unit test suite
```

## Shared header and footer

Edit `src/layout/header.partial`, `footer.partial`, and the two action partials to change the site-wide layout. The blog generator uses these same files. `npm run dev` and `npm run build` synchronize the static HTML pages; run `npm run check:layout` to confirm every content page matches. The redirect at `blog/posts/index.html` intentionally has no site layout.
