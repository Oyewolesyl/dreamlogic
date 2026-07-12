# Dream Logic Product Architecture

Dream Logic is a monorepo organised for continuous expansion.

## Applications

- `apps/web`: public site, authenticated product shell, onboarding, dashboard, chart studio, journal, subscriptions, practitioner workspace, reports, and privacy centre.
- `apps/admin`: internal administration for users, entitlements, content, glyph management, calculation health, billing, support, and audit tools.
- `apps/astrology-api`: deterministic calculation service boundary. This service will integrate Swiss Ephemeris or an equivalent licensed provider.
- `apps/worker`: future background processing for reports, alerts, imports, and recurring calculations.
- `apps/report-renderer`: future report rendering pipeline for PDF, web, and print exports.

## Packages

- `brand`: logo lockups, private muse configuration, brand usage rules.
- `glyphs`: 16-grid glyph definitions and rendering.
- `design-tokens`: colour, theme, typography, spacing, motion, and border tokens.
- `astrology-domain`: chart calculation contracts, birth data types, provider abstraction, validation rules.
- `subscriptions`: entitlement definitions and plan behaviour.
- `database`: generated types and query helpers.

## Data Principles

Birth data, journal entries, relationship records, practitioner notes, reports, and AI conversations are private by default. PostgreSQL RLS is enabled from the first migration. AI access to personal context must be explicit and logged.

## Calculation Principles

AI never calculates charts. Chart output comes from deterministic provider records with provider name, version, settings, UTC instant, time-zone resolution metadata, and snapshot identifiers.

Unknown birth time is a first-class state. The system must omit houses, angles, and other time-dependent claims rather than fabricate them.
