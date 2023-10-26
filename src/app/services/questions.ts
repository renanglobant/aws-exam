import HttpStatus from "http-status-codes";

import { Question } from "../types/questions";
import axios from "./api";

export const getQuestions = async () => {
  try {
    const res = await axios.get<{ questions: Question[] }>("/questions");

    if (res.status !== HttpStatus.OK) {
      throw new Error(`Error in fetching questions. Status: ${res.status}`);
    }

    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
