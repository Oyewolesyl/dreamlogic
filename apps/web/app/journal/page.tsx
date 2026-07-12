import { AppShell } from "../../components/AppShell";
import { ProductWorkbench } from "../../components/ProductWorkbench";

export default function JournalPage() {
  return <AppShell><p className="eyebrow">Lived experience</p><h1 className="headline">Journal timeline</h1><ProductWorkbench initialTab="Journal" /></AppShell>;
}
