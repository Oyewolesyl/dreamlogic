import { AppShell } from "../../components/AppShell";
import { ProductWorkbench } from "../../components/ProductWorkbench";

export default function ClientsPage() {
  return <AppShell><p className="eyebrow">Professional practice</p><h1 className="headline">Client workspace</h1><ProductWorkbench initialTab="Clients" /></AppShell>;
}
