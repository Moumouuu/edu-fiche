import axios from "axios";

export const incrementFreeTrial = async () => {
  try {
    await axios.post("/api/free-trial/increment");
    console.log("Free trial incremented successfully!");
  } catch (err) {
    console.log(err);
  }
};
