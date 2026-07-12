import { AppShell } from "../../components/AppShell";
import { ProductWorkbench } from "../../components/ProductWorkbench";

export default function SubscriptionsPage() {
  return <AppShell><p className="eyebrow">Entitlements</p><h1 className="headline">Subscriptions</h1><ProductWorkbench initialTab="Subscriptions" /></AppShell>;
}
