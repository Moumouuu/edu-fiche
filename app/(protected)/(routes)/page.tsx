import { apiUserLimit } from "@/actions/apiUserLimit";
import SheetPage from "@/components/pages/SheetGenerationPage";
import { checkSubscription } from "@/lib/subscription";

export default async function Home() {
  const userLimit = await apiUserLimit();
  const isSubscribed = await checkSubscription();

  return (
    <div className="w-full">
      <SheetPage userLimit={userLimit} isSubscribed={isSubscribed} />
    </div>
  );
}
