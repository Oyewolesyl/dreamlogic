import { ModulePage } from "../../components/ModulePage";
import { getProductModule } from "../../lib/product-modules";

export default function ResearchPage() {
  return <ModulePage module={getProductModule("research")} />;
}
