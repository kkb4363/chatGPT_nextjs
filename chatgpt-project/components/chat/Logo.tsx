import { BASE_URL } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={BASE_URL} className="flex items-center gap-2">
      <Image width={40} height={40} src={"/globe.svg"} alt="logo" />
      <h1 className="text-2xl font-bold">Chat GPT</h1>
    </Link>
  );
}

// next에서 static 파일에 접근할 때는 public이 기본 경로이기 때문에 public은 생략해서 작성하면 됨
