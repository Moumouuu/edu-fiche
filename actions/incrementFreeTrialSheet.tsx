import axios from "axios";

export const incrementFreeTrialSheet = async () => {
  try {
    await axios.post("/api/freeTrial/increment");
    console.log("Free trial incremented successfully!");
  } catch (err) {
    console.log(err);
  }
};
