"use client";

import { Authenticated, useMutation } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useState } from "react";

export default function Home() {
  return (
    <Authenticated>
      <Content />
    </Authenticated>
  );
}

function Content() {
  const messages = useQuery(api.messages.getForCurrentUser);
  const newMessage = useMutation(api.messages.postMessage);
  const [message, setMessage] = useState("");
  return (
    <div className="space-y-8">
      <div className="flex flex-col max-w-48 gap-4">
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button
          onClick={(e) => {
            newMessage({ message });
            setMessage("");
          }}
        >
          Add
        </button>
      </div>
      <div>Authenticated content: {messages?.length}</div>
      {messages?.length > 0
        ? messages?.map((m) => {
            return <p key={m._id}>{m.message}</p>;
          })
        : null}
    </div>
  );
}
