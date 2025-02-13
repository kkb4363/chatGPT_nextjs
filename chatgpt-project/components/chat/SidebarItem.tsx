"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSheetStore } from "@/store/sheet";

type Props = {
  item: {
    id: string;
    label: string;
    icon: React.ReactNode;
    href: string;
  };
};

export default function SidebarItem({ item }: Props) {
  const { id, label, icon, href } = item;
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setOpen } = useSheetStore();

  const handleMenu = () => {
    setIsMenuOpen((p) => !p);
  };

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between text-sm p-3 group hover:text-white hover:bg-white/10 rounded-lg",
        isMenuOpen || pathname === href
          ? "text-white bg-white/10"
          : "text-zinc-400"
      )}
      onClick={() => setOpen(false)}
    >
      {/* label 영역 */}
      <div className="flex items-center gap-2">
        {icon}
        <span className="w-[180px] truncate">{label}</span>
      </div>

      {/* dropdown 영역 */}
      {id !== "new" && (
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <div onClick={handleMenu}>
              <Ellipsis
                className={cn(
                  "group-hover:block text-gray-400 hover:text-white",
                  isMenuOpen ? "block text-white" : "md:hidden text-gray-400"
                )}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Pencil size={18} /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash size={18} /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </Link>
  );
}
