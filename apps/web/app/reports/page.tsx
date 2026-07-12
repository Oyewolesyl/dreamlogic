import { ModulePage } from "../../components/ModulePage";
import { getProductModule } from "../../lib/product-modules";

export default function ReportsPage() {
  return <ModulePage module={getProductModule("reports")} />;
}
