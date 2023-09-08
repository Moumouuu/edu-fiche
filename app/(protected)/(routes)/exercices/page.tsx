import { apiUserLimit } from "@/actions/apiUserLimit";
import ExercicesPage from "@/components/pages/ExercicesPage";
import { checkSubscription } from "@/lib/subscription";

export default async function Home() {
  const userLimit = await apiUserLimit();
  const isSubscribed = await checkSubscription();
  return (
    <div className="w-full">
      <ExercicesPage userLimit={userLimit} isSubscribed={isSubscribed} />
    </div>
  );
}
