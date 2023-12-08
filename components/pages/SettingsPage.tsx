import { Toaster } from "react-hot-toast";
import Feedback from "./settings/feedback";
import HeaderSettings from "./settings/headerSettings";
import Payment from "./settings/payment";

export default function SettingsPage() {
  return (
    <div className="md:p-4 px-4 py-14 flex flex-col w-full">
      <HeaderSettings />
      <Payment />
      <Feedback />
    </div>
  );
}
