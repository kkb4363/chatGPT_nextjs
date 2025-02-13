"use client";
import Chat from "@/components/chat/Chat";
import { useModelStore } from "@/store/model";
import React from "react";

export default function Chatpage() {
  const { model } = useModelStore();
  console.log(model);

  return <Chat />;
}
