import { AppShell } from "../../components/AppShell";
import { ProductWorkbench } from "../../components/ProductWorkbench";

export default function DashboardPage() {
  return <AppShell><p className="eyebrow">Workspace home</p><h1 className="headline">Dashboard</h1><ProductWorkbench initialTab="Dashboard" /></AppShell>;
}
