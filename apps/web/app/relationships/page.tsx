import { ModulePage } from "../../components/ModulePage";
import { getProductModule } from "../../lib/product-modules";

export default function RelationshipsPage() {
  return <ModulePage module={getProductModule("relationships")} />;
}
