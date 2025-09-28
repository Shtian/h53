"use client";

import { Authenticated, Unauthenticated, useMutation } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useState } from "react";

export default function Home() {
  return (
    <>
      <Authenticated>
        <UserButton />
        <Content />
      </Authenticated>
      <Unauthenticated>
        NOT AUTH
        <SignInButton />
      </Unauthenticated>
    </>
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
