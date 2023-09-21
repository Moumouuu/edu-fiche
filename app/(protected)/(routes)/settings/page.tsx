import SettingsPage from "@/components/pages/SettingsPage";
import { checkSubscription } from "@/lib/subscription";
export default async function Settings() {
  const isSubscribed = await checkSubscription();
  return <SettingsPage isSubscribed={isSubscribed} />;
}
