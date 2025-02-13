// 로그인이 되어 있는 데, 로그인 or 회원가입 페이지로 이동하는 경우
// 또는 로그인이 안되어 있는데, 메인 페이지로 이동하는 경우 처리하는 코드

import { NextRequest, NextResponse } from "next/server";
import { AUTH_ROUTES, BASE_URL } from "./constants/routes";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  const session = sessionCookie ? sessionCookie.value : null;

  if (
    !session &&
    pathname !== AUTH_ROUTES.LOGIN &&
    pathname !== AUTH_ROUTES.SIGNUP
  ) {
    // 로그인이 안되어 있고 현재 경로가 로그인 페이지나 회원가입 페이지가 아닌 경우
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl));
  }

  if (
    session &&
    (pathname === AUTH_ROUTES.LOGIN || pathname === AUTH_ROUTES.SIGNUP)
  ) {
    // 로그인 되어 있고 현재 경로가 로그인 페이지인 경우
    return NextResponse.redirect(new URL(BASE_URL, request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
