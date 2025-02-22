import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name?: string;
  content?: string;
  role: string;
};

export default function Message({ name = "User", content = "", role }: Props) {
  const isAdmin = role === "assistant";
  const avatarName = isAdmin ? "Chat GPT" : name;

  return (
    <div className="flex items-start gap-2 mb-5">
      {/* 아바타 */}
      <Avatar>
        <AvatarImage src={isAdmin ? "globe.svg" : ""} alt="avatar" />
        <AvatarFallback>{avatarName[0]}</AvatarFallback>
      </Avatar>

      {/* 이름 + 내용 */}
      <div className="mt-2">
        <h2 className="font-bold ">{avatarName}</h2>
        <div className="mt-2 whitespace-break-spaces">{content}</div>
      </div>
    </div>
  );
}
