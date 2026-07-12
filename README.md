# dream logic admin

private admin dashboard for dream logic.

## purpose

this repo is the internal admin surface. it should not be used as the public landing page or the user-facing web app.

the public product has been split into separate repos:

- landing page: `https://github.com/Oyewolesyl/dreamlogic-landingpage.git`
- web app: `https://github.com/Oyewolesyl/dreamlogic-webapp.git`
- admin dashboard: `https://github.com/Oyewolesyl/dreamlogic.git`

## password protection

the admin dashboard is gated before the dashboard renders.

set these environment variables in vercel:

```txt
DREAMLOGIC_ADMIN_PASSWORD=your password
DREAMLOGIC_ADMIN_SECRET=any long random secret
STRIPE_SECRET_KEY=your stripe secret key
NEXT_PUBLIC_LANDING_URL=https://your-landing-domain
NEXT_PUBLIC_WEBAPP_URL=https://your-webapp-domain
NEXT_PUBLIC_ADMIN_URL=https://your-admin-domain
```

do not commit the password or secret to git.

`STRIPE_SECRET_KEY` is required for the admin buyers section to show real customers, purchases, subscriptions, recurring revenue, and paid volume.

## local setup

from the admin app:

```bash
cd apps/admin
npm install
npm run dev
```

production build:

```bash
cd apps/admin
npm run build
```

## deployment

deploy this repo as the private admin dashboard only. do not link to it from the landing page or web app.

## current boundary

admin remains isolated from the public surfaces. landing and web app can link to each other, but neither should expose the admin dashboard.
