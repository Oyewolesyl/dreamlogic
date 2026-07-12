import { ModulePage } from "../../components/ModulePage";
import { getProductModule } from "../../lib/product-modules";

export default function AdminPage() {
  return <ModulePage module={getProductModule("admin")} />;
}
