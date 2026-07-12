import { AppShell } from "../../components/AppShell";
import { ProductWorkbench } from "../../components/ProductWorkbench";

export default function PrivacyPage() {
  return <AppShell><p className="eyebrow">Control and consent</p><h1 className="headline">Privacy centre</h1><ProductWorkbench initialTab="Privacy" /></AppShell>;
}
