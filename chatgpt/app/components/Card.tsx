import React from "react";

export default async function Card() {
  const res = await fetch("http://localhost:3000/api/test");
  const data = await res.json();
  console.log("client_data=", data);
  return (
    <div style={{ width: "200px", height: "200px", background: "tomato" }}>
      Card
    </div>
  );
}
