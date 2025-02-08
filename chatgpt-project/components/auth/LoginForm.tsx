"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import FormCard from "./FormCard";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Submit from "./Submit";
import { useFormValidate } from "@/hooks/useFormValidate";
import { LoginFormSchema } from "@/schemas/auth";
import { TLoginFormError } from "@/types/form";
import FormMessage from "./FormMessage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login } from "@/actions/login";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const { errors, validateField } =
    useFormValidate<TLoginFormError>(LoginFormSchema);
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateField(name, value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await login(formData);

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
      title="로그인"
      footer={{ label: "아직 계정이 없으신가요", href: "/signup" }}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
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
        <Submit className="w-full">로그인</Submit>
      </form>
    </FormCard>
  );
}
