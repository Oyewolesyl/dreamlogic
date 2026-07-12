import { ModulePage } from "../../components/ModulePage";
import { getProductModule } from "../../lib/product-modules";

export default function JournalPage() {
  return <ModulePage module={getProductModule("journal")} />;
}
