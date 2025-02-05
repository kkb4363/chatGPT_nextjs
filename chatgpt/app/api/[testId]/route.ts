import { NextResponse } from "next/server";

type Params = Promise<{ testId: string }>;

// params는 async이기 때문에 Promise로 감싸서 타이핑
export async function POST(request: Request, segmentData: { params: Params }) {
  const userData = await request.json();
  // params를 사용할 때 역시 await을 붙혀야 함
  const params = await segmentData.params;
  console.log("server user data=", userData);
  console.log("server params=", params.testId);

  return NextResponse.json(
    {
      message: "성공적으로 생성하였습니다",
    },
    { status: 200 }
  );
}
