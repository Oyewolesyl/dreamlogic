import { ModulePage } from "../../components/ModulePage";
import { getProductModule } from "../../lib/product-modules";

export default function PrivacyPage() {
  return <ModulePage module={getProductModule("privacy")} />;
}
