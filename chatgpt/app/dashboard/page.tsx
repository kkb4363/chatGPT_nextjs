import React, { Suspense } from "react";
import Card from "../components/Card";

export default async function dashboardPage() {
  const res = await fetch("http://localhost:3000/api/test");
  const data = await res.json();
  console.log("client_data=", data);

  return (
    <div>
      dashboardPage
      <Suspense fallback={<div>Card1 loading...</div>}>
        <Card />
      </Suspense>
      <Suspense fallback={<div>Card2 loading...</div>}>
        <Card />
      </Suspense>
      <Suspense fallback={<div>Card3 loading...</div>}>
        <Card />
      </Suspense>
      <Suspense fallback={<div>Card4 loading...</div>}>
        <Card />
      </Suspense>
    </div>
  );
}
