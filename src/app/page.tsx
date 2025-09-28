"use client";

import { Authenticated } from "convex/react";

export default function Home() {
  return (
    <Authenticated>
      <Content />
    </Authenticated>
  );
}

function Content() {
  return (
    <div className="space-y-8">
      <h1>Høgfjellia 53</h1>
    </div>
  );
}
