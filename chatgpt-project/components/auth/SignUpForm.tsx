"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import FormCard from "./FormCard";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Submit from "./Submit";
import { useFormValidate } from "@/hooks/useFormValidate";
import { SignUpSchema } from "@/schemas/auth";
import { TSignUpFormError } from "@/types/form";
import FormMessage from "./FormMessage";
import { signUp } from "@/actions/signup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignUpForm() {
  const [error, setError] = useState<string | null>(null);
  const { errors, validateField } =
    useFormValidate<TSignUpFormError>(SignUpSchema);
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await signUp(formData);

    if (response.success) {
      router.push(response.redirectUrl);
    } else {
      setError(response.errorMessage ?? null);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <FormCard
      title="회원가입"
      footer={{ label: "이미 계정이 있으신가요", href: "/login" }}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            placeholder="이름을 입력해주세요"
            onChange={handleChange}
            error={!!errors?.name}
          />
          {errors?.name && <FormMessage message={errors.name[0]} />}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@naver.com"
            onChange={handleChange}
            error={!!errors?.email}
          />
          {errors?.email && <FormMessage message={errors.email[0]} />}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="*********"
            onChange={handleChange}
            error={!!errors?.password}
          />
          {errors?.password && <FormMessage message={errors.password[0]} />}
        </div>

        {error && <FormMessage message={error} />}
        <Submit className="w-full">가입하기</Submit>
      </form>
    </FormCard>
  );
}
