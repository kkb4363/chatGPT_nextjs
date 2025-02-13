"use client";

import React, { TextareaHTMLAttributes, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function AutoResizingTextarea({
  value,
  ...others
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "inherit";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <Textarea
      className="min-h-[20px] max-h-[200px]"
      value={value}
      ref={textAreaRef}
      {...others}
    />
  );
}
