export type EntitlementKey =
  | "profile.one"
  | "profile.multiple"
  | "chart.basic"
  | "chart.multi_ring"
  | "chart.custom_orbs"
  | "interpretation.full"
  | "timing.advanced"
  | "journal.timeline"
  | "relationship.charts"
  | "reports.generate"
  | "ai.limited"
  | "ai.standard"
  | "ai.professional"
  | "practitioner.clients"
  | "practitioner.intake"
  | "practitioner.private_notes"
  | "team.roles"
  | "research.datasets"
  | "research.bulk_calculation";

export type PlanCode = "free" | "seeker" | "depth" | "practitioner" | "practice" | "research";

export type SubscriptionPlan = {
  code: PlanCode;
  label: string;
  entitlements: readonly EntitlementKey[];
};

export const subscriptionPlans: readonly SubscriptionPlan[] = [
  { code: "free", label: "Free", entitlements: ["profile.one", "chart.basic", "ai.limited"] },
  { code: "seeker", label: "Seeker", entitlements: ["profile.multiple", "chart.basic", "interpretation.full", "journal.timeline", "relationship.charts", "reports.generate", "ai.standard"] },
  { code: "depth", label: "Depth", entitlements: ["profile.multiple", "chart.basic", "chart.multi_ring", "chart.custom_orbs", "interpretation.full", "timing.advanced", "journal.timeline", "relationship.charts", "reports.generate", "ai.standard"] },
  { code: "practitioner", label: "Practitioner", entitlements: ["profile.multiple", "chart.basic", "chart.multi_ring", "chart.custom_orbs", "interpretation.full", "timing.advanced", "journal.timeline", "relationship.charts", "reports.generate", "ai.professional", "practitioner.clients", "practitioner.intake", "practitioner.private_notes"] },
  { code: "practice", label: "Practice", entitlements: ["profile.multiple", "chart.basic", "chart.multi_ring", "chart.custom_orbs", "interpretation.full", "timing.advanced", "journal.timeline", "relationship.charts", "reports.generate", "ai.professional", "practitioner.clients", "practitioner.intake", "practitioner.private_notes", "team.roles"] },
  { code: "research", label: "Research", entitlements: ["profile.multiple", "chart.basic", "chart.multi_ring", "chart.custom_orbs", "interpretation.full", "timing.advanced", "reports.generate", "ai.standard", "research.datasets", "research.bulk_calculation"] }
];

export const hasEntitlement = (planCode: PlanCode, entitlement: EntitlementKey): boolean => {
  const plan = subscriptionPlans.find((item) => item.code === planCode);
  return Boolean(plan?.entitlements.includes(entitlement));
};
