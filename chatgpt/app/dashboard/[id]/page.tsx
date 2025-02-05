"use client";
import { use } from "react";

// clinet 역시도 params 부분은 Promise로 감싸준다
type Params = Promise<{ id: string }>;

export default function DynamicPage(props: { params: Params }) {
  // client에서는 await을 사용할 수 없으므로 react에서 새로 추가된 use 훅으로 받아줘야 한다
  const { id } = use(props.params);

  const handleSubmit = async () => {
    const response = await fetch("/api/1234", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "test name", email: "test email" }),
    });

    const data = await response.json();

    console.log("client_submit_data=", data);
  };

  return (
    <div>
      Id= {id}
      <button type="submit" onClick={handleSubmit}>
        전송
      </button>
    </div>
  );
}
