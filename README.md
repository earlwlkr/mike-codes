# mike-codes

Terminal-style launcher for Mike's production Vercel apps.

## Stack

- Next.js App Router
- React 19
- Tailwind CSS 4
- TypeScript

## Scripts

```bash
pnpm dev      # start local dev server
pnpm lint     # lint source
pnpm build    # production build
pnpm start    # run production server
```

## Improvements in this revision

- Added a searchable project board with instant filtering and no-results UX.
- Added one-click copy action for project URLs.
- Hardened project catalog reliability by validating HTTPS URLs and duplicate keys at load time.
- Project list is now consistently sorted by project name.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.
