import type { DreamGlyphName } from "@dream-logic/glyphs";

export type ProductModule = {
  slug: string;
  title: string;
  eyebrow: string;
  glyph: DreamGlyphName;
  summary: string;
  primaryActions: readonly string[];
  states: readonly string[];
  privacy: string;
};

export const productModules: readonly ProductModule[] = [
  {
    slug: "auth",
    title: "Authentication",
    eyebrow: "Account access",
    glyph: "privacy",
    summary: "Email/password, magic link, Google OAuth, verification, password reset, sessions, consent, export, and deletion are the auth contract for Dream Logic.",
    primaryActions: ["Create account", "Send magic link", "Reset password", "Revoke sessions"],
    states: ["Signed out", "Verification required", "Session active", "Deletion pending"],
    privacy: "Authentication events are audited without storing private chart or journal text in analytics."
  },
  {
    slug: "dashboard",
    title: "Dashboard",
    eyebrow: "Workspace home",
    glyph: "timeline",
    summary: "A role-aware home for seekers, students, practitioners, teachers, researchers, and clients.",
    primaryActions: ["Continue chart study", "Review transits", "Open journal", "Prepare session"],
    states: ["Empty workspace", "Profile ready", "Practitioner mode", "Research mode"],
    privacy: "Dashboard cards only reveal data the signed-in user is entitled to see."
  },
  {
    slug: "charts",
    title: "Interactive Chart Studio",
    eyebrow: "Deterministic charts",
    glyph: "natal-chart",
    summary: "Single wheel, bi-wheel, tri-wheel, layer controls, aspect filters, saved views, print mode, and accessible chart tables.",
    primaryActions: ["Calculate natal chart", "Compare systems", "Save view", "Export SVG"],
    states: ["Awaiting birth profile", "Calculating", "Unknown time limitation", "Chart ready"],
    privacy: "Chart snapshots are versioned and scoped by profile ownership and consent."
  },
  {
    slug: "transits",
    title: "Transit Centre",
    eyebrow: "Timing calendar",
    glyph: "transits",
    summary: "Today, week, month, and year views for exact transits, entering-orb events, stations, ingresses, lunar phases, and alerts.",
    primaryActions: ["Open today", "Scan month", "Create alert", "Link to journal"],
    states: ["No profile", "No timed houses", "Events loading", "Personal calendar ready"],
    privacy: "Transit alerts never expose private birth data in notification previews."
  },
  {
    slug: "journal",
    title: "Journal and Timeline",
    eyebrow: "Lived experience",
    glyph: "journal",
    summary: "Daily reflection, dreams, life events, consultation notes, study notes, and transit observations in a combined timeline.",
    primaryActions: ["New reflection", "Log dream", "Attach transit", "Export entries"],
    states: ["Private draft", "Linked to chart", "Shared with practitioner", "Export ready"],
    privacy: "Journal text is excluded from analytics and only sent to AI after explicit permission."
  },
  {
    slug: "relationships",
    title: "Relationship Astrology",
    eyebrow: "Consent-first comparison",
    glyph: "relationship",
    summary: "Synastry, composite charts, Davison charts, relationship timeline, private notes, shared notes, and reports without simplistic compatibility scores.",
    primaryActions: ["Invite profile", "Calculate synastry", "Build composite", "Draft report"],
    states: ["Private", "Consent requested", "Shared", "Practitioner review"],
    privacy: "Relationship access can be revoked and never reveals practitioner-private notes."
  },
  {
    slug: "clients",
    title: "Practitioner Workspace",
    eyebrow: "Professional practice",
    glyph: "practitioner",
    summary: "Client CRM, invitations, consent, intake forms, appointments, session preparation, private notes, client-visible notes, payments, reports, and follow-ups.",
    primaryActions: ["Invite client", "Create intake", "Prepare session", "Send follow-up"],
    states: ["Lead", "Invited", "Active client", "Archived"],
    privacy: "Practitioner-private notes are never shown in client portals or shared reports."
  },
  {
    slug: "reports",
    title: "Reports",
    eyebrow: "Editorial exports",
    glyph: "report",
    summary: "Natal, transit, year-ahead, solar-return, relationship, consultation, study, and research reports with Dream Logic lockups and modular dividers.",
    primaryActions: ["Generate report", "Review sections", "Export PDF", "Share link"],
    states: ["Draft", "Calculating", "Needs review", "Published"],
    privacy: "Report sharing uses revocable access tokens and audit logs."
  },
  {
    slug: "subscriptions",
    title: "Subscriptions",
    eyebrow: "Entitlements",
    glyph: "subscription",
    summary: "Free, Seeker, Depth, Practitioner, Practice, and Research plans are implemented through capability checks rather than hard-coded UI gates.",
    primaryActions: ["Compare plans", "Start Stripe checkout", "Sync webhook", "Audit entitlement"],
    states: ["Free", "Trial", "Active", "Past due"],
    privacy: "Billing provider identifiers are separated from chart and journal content."
  },
  {
    slug: "privacy",
    title: "Privacy Centre",
    eyebrow: "Control and consent",
    glyph: "privacy",
    summary: "Users can manage shared access, AI context permissions, practitioner permissions, exports, deletion, sessions, and audit visibility.",
    primaryActions: ["Export data", "Revoke access", "Manage AI context", "Delete account"],
    states: ["Private", "Shared", "Export processing", "Deletion cooling-off"],
    privacy: "Privacy controls are first-class product features, not account-settings afterthoughts."
  },
  {
    slug: "learn",
    title: "Learning Academy",
    eyebrow: "Study system",
    glyph: "learning",
    summary: "Courses, lessons, quizzes, flashcards, chart exercises, assignments, cohorts, and teacher feedback for serious astrology study.",
    primaryActions: ["Start lesson", "Practice chart", "Take quiz", "Submit assignment"],
    states: ["Not enrolled", "In progress", "Submitted", "Completed"],
    privacy: "Teacher feedback is scoped to the course workspace."
  },
  {
    slug: "research",
    title: "Research Lab",
    eyebrow: "Reproducible astrology",
    glyph: "research",
    summary: "Datasets, tags, filters, saved queries, placement searches, aspect searches, anonymisation, exports, and methodology notes.",
    primaryActions: ["Create dataset", "Run query", "Anonymise export", "Save methodology"],
    states: ["Draft dataset", "Missing data", "Query ready", "Exported"],
    privacy: "Research exports must display sample size, missing data, certainty, settings, and limitations."
  },
  {
    slug: "admin",
    title: "Administration",
    eyebrow: "Operations",
    glyph: "settings",
    summary: "Users, subscriptions, practitioner review, interpretation content, courses, glyph management, feature flags, AI usage, calculation health, billing, support, reports, audits, and incidents.",
    primaryActions: ["Review content", "Inspect billing", "Preview glyph", "Audit incident"],
    states: ["Healthy", "Needs review", "Flagged", "Incident"],
    privacy: "Admin access is audited and separated from practitioner/client sharing."
  }
];

export const getProductModule = (slug: string): ProductModule => {
  const module = productModules.find((item) => item.slug === slug);
  if (!module) {
    throw new Error(`Unknown Dream Logic module: ${slug}`);
  }
  return module;
};
