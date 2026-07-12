import { AppShell } from "../../components/AppShell";
import { ProductWorkbench } from "../../components/ProductWorkbench";

export default function ReportsPage() {
  return <AppShell><p className="eyebrow">Editorial exports</p><h1 className="headline">Reports</h1><ProductWorkbench initialTab="Reports" /></AppShell>;
}
