# Strapi CMS for RoboCollective.ai

This project keeps the landing page content in a Strapi single type so copy, labels, and metrics can be edited without redeploying the static assets.

## 1. Bootstrap the Strapi backend

1. Install Node.js 18+ / npm 10+ (required by the latest Strapi release).
2. In a sibling directory (e.g., `strapi-backend`), run:
   ```bash
   npx create-strapi-app@latest strapi-backend --quickstart
   ```
   This creates the admin panel and database; choose SQLite for a quick start.
3. Once Strapi is running, sign into the admin UI (`http://localhost:1337/admin`) and enable the Public role's `find` and `findOne` permissions for the new `landing` single type so the front end can call the API without credentials.

## 2. Build the landing single type

Use the Content-Types Builder to create a `Landing` **single type** with these fields:

| Field | Type | Notes |
| --- | --- | --- |
| `heroHeadingPrefix` | Text | Prefix text before the dynamic word. |
| `heroHeadingSuffix` | Text | Suffix text after the dynamic word. |
| `heroLede` | Rich Text | Short supporting paragraph. |
| `heroDynamicWords` | Repeatable component (`hero-dynamic-word`) | Each component contains a single `word` text field. |
| `heroMeta` | Repeatable component (`hero-meta-item`) | Each component has a `text` field. |
| `services` | Repeatable component (`service-card`) | Component fields: `title`, `description`. |
| `processSteps` | Repeatable component (`process-step`) | Component fields: `title`, `description`. |
| `metrics` | Repeatable component (`metric`) | Component fields: `value`, `description`. |
| `caseStudies` | Repeatable component (`case-study`) | Fields: `title`, `summary`, `highlight` (boolean). |
| `ctaHeading` | Text | CTA h2 text. |
| `ctaBody` | Rich Text | CTA paragraph. |
| `ctaPrimaryLabel` | Text | Primary action label. |
| `ctaPrimaryUrl` | Text | Primary action URL (e.g., `mailto:` or `/contact`). |
| `ctaSecondaryLabel` | Text | Secondary action label. |
| `ctaSecondaryUrl` | Text | Secondary action URL |

## 3. Seed the landing entry

Once the model is saved, open the `Landing` single type and supply values matching the copy you want. Example payload (you can paste this under **Settings → Developer Tools → REST API** and use `POST`/`PUT` against `http://localhost:1337/api/landing?populate=deep`):

```json
{
  "data": {
    "heroHeadingPrefix": "RoboCollective.ai orchestrates ",
    "heroHeadingSuffix": " workflows so you can scale with confidence.",
    "heroLede": "We bridge strategic vision and operational precision through AI-native systems, data synthesis, and human-centered design.",
    "heroDynamicWords": [
      { "word": "adaptive" },
      { "word": "intelligent" },
      { "word": "human-centered" }
    ],
    "heroMeta": [
      { "text": "Trusted by engineering, product, and operations teams" },
      { "text": "Dynamic pricing, predictable ROI" }
    ],
    "services": [
      { "title": "Intelligent automation", "description": "Design, launch, and monitor AI agents..." },
      { "title": "Data storytelling", "description": "... aligned on next steps." },
      { "title": "Operational UX", "description": "Architect human-centered dashboards..." }
    ],
    "processSteps": [
      { "title": "Immersion", "description": "We shadow your teams..." },
      { "title": "System design", "description": "Our architects build automation..." },
      { "title": "Launch + learn", "description": "We ship targeted experiences..." }
    ],
    "metrics": [
      { "value": "3.2x", "description": "More runbooks automated within three months" },
      { "value": "94%", "description": "Stakeholder confidence after first sprint" },
      { "value": "48", "description": "Dashboards kept in sync with live AI insights" }
    ],
    "caseStudies": [
      { "title": "Launch intelligence for a new AI product", "summary": "United product/ops teams...", "highlight": false },
      { "title": "Automation for global research", "summary": "Scaled collaboration across continents...", "highlight": true },
      { "title": "Operations pulse for fintech teams", "summary": "Crafted a resilient operating system...", "highlight": false }
    ],
    "ctaHeading": "Embed RoboCollective.ai inside your next launch.",
    "ctaBody": "Share your most strategic ambition, and we'll co-create a roadmap that combines automation, intelligence, and creative rigor.",
    "ctaPrimaryLabel": "Plan a discovery call",
    "ctaPrimaryUrl": "mailto:hello@robocollective.ai",
    "ctaSecondaryLabel": "Download capability overview",
    "ctaSecondaryUrl": "#"
  }
}
```

## 4. Connect the frontend

1. The Flask app serves `index.html` from `http://localhost:5000`. The frontend script calls `http://localhost:1337/api/landing?populate=deep` by default. Modify the `STRAPI_URL` global before the script loads (for example, by adding `<script>window.STRAPI_URL = "https://your-strapi-host";</script>` to `index.html` before `scripts.js`) if the backend lives elsewhere.
2. Ensure Strapi's CORS settings allow requests from your frontend origin (`http://localhost:5000` by default). The Strapi admin UI exposes CORS controls under **Settings → Global Settings → Security**.
3. Run Strapi with `npm run develop` (or `npm run start` for production) inside the backend folder and keep it running while previewing the Flask-hosted frontend.

## 5. Deployed workflow reminders

When Strapi is merged into the robocollective.ai stack, follow these steps so the site and CMS stay in sync:

1. Treat the deployed Strapi host (for example `https://strapi.robocollective.ai`) as the single source of truth. Set the global `window.STRAPI_URL` to that host before including `scripts.js` so the landing copy fetches from the production CMS instead of `localhost`.
2. Rather than editing the static files with new URLs, expose the host through an environment variable on the Flask side (e.g., `ROBO_STRAPI_URL`) and inject it with a small inline script or server-rendered script tag. That lets you swap hosts between staging and production without touching the shipped assets.
3. After approving content in Strapi, restart the Flask server (`python server.py` locally or your cloud process), confirm the UI renders the updated copy, then redeploy the Flask site so the merged deployment references the live Strapi host and the refreshed content.
