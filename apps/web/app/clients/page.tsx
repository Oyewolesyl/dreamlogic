import { ModulePage } from "../../components/ModulePage";
import { getProductModule } from "../../lib/product-modules";

export default function ClientsPage() {
  return <ModulePage module={getProductModule("clients")} />;
}
