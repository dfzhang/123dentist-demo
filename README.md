# 123Dentist CMS

Multi-tenant content management system for 123Dentist's 450+ office network. Built with Sanity CMS and Next.js.

## Architecture

- **Single Sanity dataset** — all offices share one dataset, scoped by `office._ref`
- **Three workspace types** — admin, per-office (single-tenant), and per-group (multi-office)
- **Office-scoped content** — `officeScoped()` helpers enforce data isolation at the schema level
- **Hybrid i18n** — document-level for pages/services/team/FAQ/testimonials, field-level for 5 office fields
- **Presentation tool** — live preview with click-to-edit overlays and "Used on X pages" location resolver

### Workspace types

| Workspace | Registered from | Structure |
|-----------|----------------|-----------|
| **Admin** | Hardcoded | Corporate view — all groups, all offices, all content |
| **Office** (single-tenant) | `lib/office-registry.ts` | One workspace per office. Direct edit surface for a single practice. Original pattern. |
| **Dental Group** (multi-office) | `lib/group-registry.ts` | One workspace per group. Top level lists the group's offices; drill in to edit each office's content. Groups can contain 1 or many offices. |

Group workspaces and office workspaces **coexist**. An office listed in both registries appears both as a standalone workspace and inside its group's workspace — useful for demoing side-by-side. If you want group-only editing for an office, remove it from `office-registry.ts`.

## Project Structure

```
├── studio/              Sanity Studio (v3)
│   ├── schemas/
│   │   ├── blocks/      17 page builder block types
│   │   ├── documents/   8 document types
│   │   └── objects/     11 shared object types
│   ├── lib/             Helpers (office-scoped, i18n, time slots, locations)
│   ├── scripts/         Demo content seed scripts
│   └── sanity.config.ts Multi-workspace config with Presentation tool
│
├── frontend/            Next.js 16 (App Router)
│   └── src/
│       ├── app/         Office-scoped routing ([office]/...)
│       ├── components/  17 block components + layout (Header/Footer)
│       └── sanity/      Client, queries, types, live preview
```

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- Sanity account with project access

### 1. Install dependencies

```bash
cd studio && pnpm install
cd ../frontend && pnpm install
```

### 2. Configure environment

```bash
# Studio
cp studio/.env.example studio/.env.development

# Frontend — you'll need a Sanity API token
cp frontend/.env.example frontend/.env.local
# Edit frontend/.env.local and add your SANITY_API_TOKEN
```

### 3. Seed demo content (optional)

```bash
cd studio
npx tsx scripts/seed-demo.ts
npx tsx scripts/seed-remaining-blocks.ts
```

### 4. Start development servers

```bash
# Terminal 1 — Studio (port 3333)
cd studio && pnpm dev --port 3333

# Terminal 2 — Frontend (port 3000)
cd frontend && pnpm dev --port 3000
```

### 5. Open

- **Admin:** http://localhost:3333/admin
- **Studio (office):** http://localhost:3333/atlantis-yaletown
- **Studio (group):** http://localhost:3333/pacific-dental-group
- **Frontend:** http://localhost:3000/atlantis-yaletown
- **Presentation tool:** Open from Studio sidebar → live preview with click-to-edit

### 6. (Optional) Backfill dental groups

If you're seeding a fresh dataset with the demo groups from `lib/group-registry.ts`:

```bash
cd studio
SANITY_AUTH_TOKEN=sk... npx tsx scripts/backfill-groups.ts
```

This creates the `dentalGroup` documents and sets the `group` reference on each member office.

## Content Model

### Document Types (9)
| Type | Scope | i18n |
|------|-------|------|
| Dental Group | Corporate (owns offices) | None |
| Office | Singleton per workspace | Field-level (5 fields) |
| Page | Office-scoped | Document-level |
| Service | Office-scoped | Document-level |
| Team Member | Office-scoped | Document-level |
| FAQ | Office-scoped | Document-level |
| Testimonial | Office-scoped | Document-level |
| Blog Post | Office-scoped | None (v2) |
| Insurance Provider | Corporate (no office ref) | None |

### Page Builder Blocks (17)
Hero, Rich Text, Services Grid, Services List, Team Grid, Team Featured, FAQ, Smile Gallery, Value Props, Technology Showcase, Image with Text, Video Embed, CTA, Contact, Financing, Testimonials, New Patient

## Key Patterns

### Office Scoping
All reference fields use `officeScopedRefOptions()` or `officeScopedArrayItem()` to filter by the current office. The helpers use Sanity's `filter` callback which receives the root document.

### Draft Mode / Live Preview
The frontend uses `next-sanity`'s `defineLive` for automatic draft/CDN switching. The draft mode enable route returns a 200 with client-side redirect (not a 307) to work through reverse proxies that strip cookies from redirects.

### Stega Encoding
In draft mode, all text fields contain invisible stega markers for click-to-edit overlays. Use `stegaClean()` before string comparisons, URL operations, or object key lookups.

## CORS Setup

Add your Studio URL to the Sanity project's CORS origins:
- `http://localhost:3333` (development)
- Your production Studio URL

## Tech Stack

- **Sanity v3** — CMS with real-time collaboration
- **Next.js 16** — React framework with App Router + Turbopack
- **Tailwind CSS v4** — Utility-first styling
- **next-sanity** — Official Sanity + Next.js integration
- **@sanity/document-internationalization** — Document-level i18n
- **sanity-plugin-internationalized-array** — Field-level i18n

## License

Private — 123Dentist
