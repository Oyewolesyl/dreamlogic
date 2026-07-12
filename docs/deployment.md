# Dream Logic Deployment

## Web

Deploy `apps/web` to Vercel.

Required environment:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ASTROLOGY_API_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `SENTRY_DSN`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `OPENAI_API_KEY`

## Admin

Deploy `apps/admin` as a separate protected Vercel project. Access must be workspace-restricted and audited.

## Astrology API

Deploy `apps/astrology-api` to Render, Railway, or Fly.io.

Production requirements:

- licensed ephemeris provider
- `SWISS_EPHEMERIS_PATH` or equivalent provider config
- provider version pinning
- calculation fixture tests
- Sentry error reporting

The API currently refuses to fabricate chart data until the licensed provider is configured.

## Supabase

Run migrations in `supabase/migrations`. RLS is enabled in the initial migration and must remain enabled.

## Billing

Use Stripe test mode before production. Webhooks should write billing events, then update subscription rows through a trusted backend process.
