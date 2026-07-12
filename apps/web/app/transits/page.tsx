import { ModulePage } from "../../components/ModulePage";
import { getProductModule } from "../../lib/product-modules";

export default function TransitsPage() {
  return <ModulePage module={getProductModule("transits")} />;
}
