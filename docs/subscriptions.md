# Dream Logic Subscriptions

Plans are entitlement-driven. Components should ask for capabilities, not hard-coded plan names.

## Initial Plans

- Free: one birth profile, basic natal chart, limited interpretations, limited transits, limited AI, limited journal.
- Seeker: multiple profiles, full interpretations, transit calendar, journal timeline, relationship charts, reports, increased AI.
- Depth: advanced timing, progressions, returns, profections, multi-ring charts, custom orbs, advanced points, study collections, higher AI and reports.
- Practitioner: clients, intake forms, appointments, session workspace, private notes, client portal, branded reports, professional AI tools.
- Practice: teams, shared clients, assistant roles, more storage, more reports, team templates, analytics.
- Research: datasets, bulk calculations, exports, collaboration, advanced queries.

## Billing Providers

Stripe is the first billing provider. Paystack is represented as an abstraction boundary so regional payment support can be added without rewriting entitlement logic.

## Rule

Access checks should call the entitlement service. UI labels may mention a plan, but permission decisions should use capability keys such as `chart.multi_ring`, `practitioner.clients`, or `research.bulk_calculation`.
