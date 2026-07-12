import { AppShell } from "../../components/AppShell";
import { ProductWorkbench } from "../../components/ProductWorkbench";

export default function TransitsPage() {
  return <AppShell><p className="eyebrow">Timing calendar</p><h1 className="headline">Transit centre</h1><ProductWorkbench initialTab="Transits" /></AppShell>;
}
