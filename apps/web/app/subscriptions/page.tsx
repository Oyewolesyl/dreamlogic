import { ModulePage } from "../../components/ModulePage";
import { getProductModule } from "../../lib/product-modules";

export default function SubscriptionsPage() {
  return <ModulePage module={getProductModule("subscriptions")} />;
}
