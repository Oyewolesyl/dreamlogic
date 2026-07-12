# Dream Logic

Dream Logic is a production-oriented astrology workspace foundation built around the supplied brand direction: stacked wordmark, modular symbol row, dark/light lockups, and a proprietary grid-derived glyph language.

This first build establishes the product architecture, design system, glyph library, application shells, onboarding model, initial database schema, calculation-domain boundaries, and subscription entitlements. It deliberately avoids fake astrology output: deterministic calculations are represented as provider contracts until a licensed ephemeris provider is wired in.

## Structure

```text
apps/web                 Next.js App Router shell
apps/admin               Admin app placeholder
apps/astrology-api       Python/FastAPI service placeholder
packages/brand           Logo lockups, muse system, brand rules
packages/design-tokens   Theme and typography tokens
packages/glyphs          Dream Logic glyph operating system
packages/astrology-domain Calculation contracts and fixtures
packages/subscriptions   Plan and entitlement service
supabase/migrations      Initial data model and RLS policies
docs                     Product, brand, glyph, billing, engine docs
```

## Local Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill Supabase, Stripe, Resend, Sentry, PostHog, and AI provider values.
3. Run `npm run dev`.
4. Run `npm run test`, `npm run typecheck`, and `npm run build` before deployment.

## Principle

AI can explain verified chart context, but it must not calculate placements, invent houses, infer unknown birth times, or expose private chart/journal/client data.
