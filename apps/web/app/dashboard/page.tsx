import { ModulePage } from "../../components/ModulePage";
import { getProductModule } from "../../lib/product-modules";

export default function DashboardPage() {
  return <ModulePage module={getProductModule("dashboard")} />;
}
