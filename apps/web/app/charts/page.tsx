import { ModulePage } from "../../components/ModulePage";
import { getProductModule } from "../../lib/product-modules";

export default function ChartsPage() {
  return <ModulePage module={getProductModule("charts")} />;
}
