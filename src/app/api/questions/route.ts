import { NextResponse } from "next/server";

import HttpStatus from "http-status-codes";

import questions from "../../data/questions.json";

export const GET = async () => {
  try {
    return NextResponse.json(questions, { status: HttpStatus.OK });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) },
      { status: HttpStatus.INTERNAL_SERVER_ERROR },
    );
  }
};
