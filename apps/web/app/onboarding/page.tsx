import { AppShell } from "../../components/AppShell";
import { ProductWorkbench } from "../../components/ProductWorkbench";

export default function OnboardingPage() {
  return (
    <AppShell>
      <p className="eyebrow">Adaptive onboarding</p>
      <h1 className="headline">Create a verified birth profile.</h1>
      <ProductWorkbench initialTab="Onboarding" />
    </AppShell>
  );
}
