import React from "react";
import Logo from "./Logo";
import { MessageSquare, Plus } from "lucide-react";
import { BASE_URL, CHAT_ROUTES } from "@/constants/routes";
import SidebarItem from "./SidebarItem";
import LogoutButton from "./LogoutButton";

const DUMMY_MENU = [
  {
    id: "new",
    label: "새로운 대화",
    icon: <Plus />,
    href: BASE_URL,
  },
  {
    id: "1",
    label:
      " 새로운 긴 대화 예시입니다새로운 긴 대화 예시입니다새로운 긴 대화 예시입니다",
    icon: <MessageSquare />,
    href: `${CHAT_ROUTES.CONVERSATIONS}/1`,
  },
  {
    id: "2",
    label: "3번째 대화 예시입니다",
    icon: <MessageSquare />,
    href: `${CHAT_ROUTES.CONVERSATIONS}/2`,
  },
];

export default function Sidebar() {
  return (
    <nav className="h-full p-3 bg-black flex flex-col text-white">
      {/* 로고 영역 + 메뉴 아이템 */}
      <div className="flex-1 overflow-y-auto">
        <Logo />
        <div className="flex flex-col gap-2 mt-10">
          {DUMMY_MENU.map((menu) => (
            <SidebarItem item={menu} key={menu.id} />
          ))}
        </div>
      </div>

      {/* 로그아웃 버튼 영역 */}
      <div className="flex justify-center">
        <LogoutButton />
      </div>
    </nav>
  );
}
