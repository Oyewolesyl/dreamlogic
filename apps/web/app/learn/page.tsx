import { ModulePage } from "../../components/ModulePage";
import { getProductModule } from "../../lib/product-modules";

export default function LearnPage() {
  return <ModulePage module={getProductModule("learn")} />;
}
