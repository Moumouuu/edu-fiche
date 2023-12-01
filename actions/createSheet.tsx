import { Message } from "ai";
import axios from "axios";

export const createSheet = async (completion: Message[], data: any) => {
  const { level, subject, keysWords } = data;
  try {
    await axios.post("/api/sheet", {
      level,
      subject,
      keysWords,
      messages: completion,
    });

    console.log("Sheet created successfully!");
  } catch (err) {
    console.log(`[ERROR_CREATE_SHEET] : ${err}`);
  }
};
