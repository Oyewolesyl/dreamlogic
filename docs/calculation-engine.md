# Dream Logic Calculation Engine

Dream Logic must use deterministic astrology calculations. AI may phrase explanations of verified chart context, but it must not calculate placements or invent missing data.

## Provider Contract

The calculation service stores:

- provider name and version
- resolver version
- original local date and time
- IANA time zone
- historical UTC offset
- DST status
- resolved UTC instant
- ambiguity status
- house system
- zodiac mode
- point set
- aspect settings
- generated chart snapshot

## Birth-Time Certainty

Supported values:

- official recorded time
- family-reported time
- approximate
- rectified
- unknown

When time is unknown, the engine must not return houses, Ascendant, Midheaven, or house overlays. It may return time-independent placements where the ephemeris supports reliable date-level calculation and the UI explains the limitation.

## First Provider

The first production provider should be Swiss Ephemeris or an equivalent licensed ephemeris service. Licensing checks must be part of production deployment.

## Test Fixtures

Calculation fixtures should cover known time, unknown time, DST fold, DST gap, historic offset, house-system differences, retrograde status, and aspect orb boundaries.
