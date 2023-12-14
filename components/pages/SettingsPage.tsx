import { Toaster } from "react-hot-toast";
import Feedback from "./settings/feedback";
import HeaderSettings from "./settings/headerSettings";
import Payment from "./settings/payment";

export default function SettingsPage() {
  return (
    <div className="p-4 mt-14 lg:mt-0 flex flex-col w-full">
      <HeaderSettings />
      <Payment />
      <Feedback />
    </div>
  );
}
