import Header from "@/components/chat/Header";
import Sidebar from "@/components/chat/Sidebar";
import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:flex h-full">
      {/* 사이드바 영역 */}
      {/* 사이드바는 모바일에서 보이지 않기 때문에 기본으로 hidden을 준다 */}
      {/* md:block을 줌으로써 데스크탑에서는 보이게 한다 */}
      <div className="hidden md:block w-[300px]">
        <Sidebar />
      </div>

      {/* Header + chat 영역 */}
      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <Header />
        {children}
      </div>
    </div>
  );
}

// md:flex
// md prefix는 반응형 ui를 적용할 때 사용하는 prefix로 md같은경우 브레이크 포인트가 768px로 화면의 크기가 768px 이상일 때 적용됨
// 즉 desktop일 경우를 구분하기 위함
