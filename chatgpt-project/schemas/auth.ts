import { z } from "zod";

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "이름을 입력해주세요" })
    .regex(/^[a-zA-Zㄱ-ㅎ가-힣]+$/, {
      message: "이름은 문자만 입력할 수 있습니다.",
    }),
  email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
    .regex(/[A-Z]/, { message: "비밀번호는 대문자로 시작해야 합니다." })
    .regex(/[a-z]/, { message: "비밀번호는 소문자를 포함해야 합니다." })
    .regex(/[0-9]/, { message: "비밀번호는 숫자를 포함해야 합니다." })
    .regex(/[\W_]/, { message: "비밀번호는 특수문자를 포함해야 합니다." }),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요" }),
});
