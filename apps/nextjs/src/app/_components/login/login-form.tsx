"use client";

import { useState } from "react";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="m-auto flex h-2/5 w-80 flex-col justify-start gap-6 rounded-2xl border border-[#BBA384] bg-transparent p-5 transition-all">
      <h1 className="mt-4 text-center align-top text-xl font-bold">
        l o g i n
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <input
          className="text-md rounded-sm p-1 pl-2 font-medium text-[#664F3D] shadow-inner"
          type="text"
          id="username"
          value={username}
          placeholder="enter a username"
        />
        <input
          className="text-md  rounded-sm p-1 pl-2 font-medium text-[#664F3D] shadow-inner "
          type="text"
          id="password"
          value={password}
          placeholder="enter a password"
        />
      </form>
      <div className="flex flex-col gap-4">
        <button
          className="rounded-2xl bg-[#eac6cc] font-semibold text-[#664F3D] shadow-inner hover:bg-[#e8b2bc]"
          type="submit"
        >
          login :3
        </button>
        <button className="rounded-2xl bg-[#C8D1A0] font-semibold text-[#664F3D] shadow-inner hover:bg-[#A7B279]">
          register new account
        </button>
      </div>
    </div>
  );
}
