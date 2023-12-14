import axios from "axios";

import { FiltersBar, Pagination } from "@/app/types/pagination";

export const getSheetsWithLimit = async (
  pagination: Pagination,
  filters?: FiltersBar
) => {
  try {
    const res = await axios.get("/api/sheet", {
      params: {
        start: pagination.start,
        end: pagination.end,
        ...filters,
      },
    });
    return res.data;
  } catch (err) {
    console.log("[ERROR_GET_SHEETS] : ", err);
    return [];
  }
};
