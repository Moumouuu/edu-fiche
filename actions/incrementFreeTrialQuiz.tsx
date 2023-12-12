import axios from "axios";

export const incrementFreeTrialQuiz = async () => {
  try {
    await axios.post("/api/freeTrial/increment/quiz");
    console.log("Free trial incremented successfully!");
  } catch (err) {
    console.log(err);
  }
};
