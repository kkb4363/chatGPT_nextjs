import { NextResponse } from "next/server";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: Request) {
  console.log(request);
  const randomDelay = Math.floor(Math.random() * 2000);
  console.log("ramdomDelay=", randomDelay);

  await delay(randomDelay);

  return NextResponse.json({ data: `${randomDelay}만에 응답완료` });
}
