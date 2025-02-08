"use server";

import { jwtVerify, SignJWT } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
// jose 라이브러리는 JSON Web Token(JWT)을 생성하고 검증하는 데 사용된다

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  id: string;
  email: string;
};

export const encrypt = async (payload: SessionPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
};

export const verify = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.error("token 검증에 실패했습니다", error);
    return null;
  }
};

// 위에서 생성한 jwt를 cookie에 저장해주는 부분
export const createSession = async (payload: SessionPayload) => {
  const expiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt(payload);

  (await cookies()).set("session", session, {
    httpOnly: true,
    // 자바스크립트에서 접근할 수 없도록
    secure: true,
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
};

export const deleteSession = async () => {
  (await cookies()).delete("session");
};

export const verifySession = async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await verify(cookie);

  if (!session?.id) {
    redirect("/login");
  }

  return session;
};
