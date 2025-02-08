"use server";

import { getUserByEmail } from "@/data/user";
import { LoginFormSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { createSession } from "./sessions";

export const login = async (formData: FormData) => {
  // 1. validate fields

  const validateFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return {
      errorMessage: "잘못된 입력값이 있습니다.",
    };
  }

  // 2. 존재하는 사용자인지 체크
  const { email, password } = validateFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return {
        errorMessage: "가입되지 않은 사용자입니다.",
      };
    }

    const { id, password: userPassword } = existingUser;

    const passwordMatch = await bcrypt.compare(password, userPassword);

    if (!passwordMatch) {
      return {
        errorMessage: "비밀번호가 일치하지 않습니다.",
      };
    }

    // create session
    await createSession({ id, email });

    // 로그인 성공 시 리디렉션
    return { success: true, redirectUrl: "/" };
  } catch (err) {
    console.log("error", err);
    return { errorMessage: "문제가 발생했습니다." };
  }
};
