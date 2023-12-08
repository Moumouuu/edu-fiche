import axios from "axios";
import { Sheet } from "@prisma/client";

import { Pagination } from "@/app/types/pagination";

export const getSheetsWithLimit = async (pagination: Pagination) => {
  try {
    const res = await axios.get("/api/sheet", {
      params: {
        start: pagination.start,
        end: pagination.end,
      },
    });
    return res.data;
  } catch (err) {
    console.log("[ERROR_GET_SHEETS] : ", err);
    return [];
  }
};
