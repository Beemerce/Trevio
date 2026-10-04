# Trevio AI website

Marketing site for Trevio AI Solutions, built with Next.js (App Router) and React from the Claude Design handoff in `design-handoff/`.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

If `next dev` fails to load Google Fonts behind a proxy, use `npx next dev --webpack`.

## Pages

| Route | Design file |
| --- | --- |
| `/` | Trevio Home |
| `/features` | Trevio Features |
| `/integrations` | Trevio Integrations Developers (`#developers` jumps to the developer half) |
| `/ai-first` | Trevio AI First |
| `/pricing` | Trevio Pricing |
| `/about` | Trevio About Contact (`/contact` redirects to `/about#contact-form`) |

## Structure

- `app/layout.tsx`: fonts (Plus Jakarta Sans, Noto Sans Arabic), shared header, footer and mobile nav.
- `components/chrome/`: sticky header (desktop nav ≥ 1100px), footer, app-style bottom tab bar with the "More" sheet, WhatsApp button.
- `components/pages/<page>/`: one client view per page plus its responsive CSS. The prototype switched layouts by reading `window.innerWidth`; here every breakpoint is a CSS media query, so mobile renders correctly on first paint.
- `app/globals.css`: brand tokens, base styles and the hover classes (`hv-*`).
- `lib/site.ts`: Login / Sign Up URLs, WhatsApp number, developer portal, nav items.

## Contact form

The form on `/about` posts JSON to `/api/contact`, which validates it and forwards it to your Trevio webhook. Copy `.env.example` to `.env.local` and set:

- `TREVIO_CONTACT_WEBHOOK_URL`: required. Without it the API returns 503 and the form shows an error.
- `TREVIO_CONTACT_WEBHOOK_SECRET`: optional, sent as `Authorization: Bearer <secret>`.

Payload: `{ source, submittedAt, name, company, email, phone, subject, message }`.

## Still placeholder (from the designs)

- Logo: gradient "t" tile and text wordmark in `components/chrome/Logo.tsx`.
- Login / Sign Up / "Get Started" URLs: `#` in `lib/site.ts`.
- Social links, legal pages and Careers: `#`.
- Prices, customer copy and integration lists are design copy and need confirming.

`scripts/dc2jsx.py` is the one-off converter used to turn the `.dc.html` templates into JSX before hand-editing.
