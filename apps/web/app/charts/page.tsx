import { AppShell } from "../../components/AppShell";
import { ProductWorkbench } from "../../components/ProductWorkbench";

export default function ChartsPage() {
  return <AppShell><p className="eyebrow">Deterministic charts</p><h1 className="headline">Chart studio</h1><ProductWorkbench initialTab="Charts" /></AppShell>;
}
