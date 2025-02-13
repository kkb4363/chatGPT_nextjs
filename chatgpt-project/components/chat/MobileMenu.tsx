"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import { useSheetStore } from "@/store/sheet";

export default function MobileMenu() {
  const { open, setOpen } = useSheetStore();

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0">
          <SheetTitle className="sr-only"></SheetTitle>{" "}
          {/* 접근성을 위한 SheetTitle 추가 */}
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
}
