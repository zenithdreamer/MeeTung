"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "~/trpc/react";

export function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const register = api.auth.register.useMutation();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !firstname || !lastname || !password || !confirmPassword) {
      return toast.error("Please fill in all fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    console.log(username, firstname, lastname, password, confirmPassword);

    try {
      await register.mutateAsync({
        username,
        firstname,
        lastname,
        password,
      });
      toast.success("Registered successfully, redirecting to login");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      toast.error("An error occurred during registration");
    }
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="m-auto flex h-fit w-80 flex-col justify-start gap-4 rounded-2xl border border-[#BBA384] bg-transparent p-5 pb-8 transition-all">
      <h1 className="mt-4 text-center align-top text-xl font-bold">
        r e g i s t e r
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleRegister}>
        <input
          className="text-md rounded-sm p-1 pl-2 font-medium text-[#664F3D] shadow-inner"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="enter a username"
        />
        <input
          className="text-md rounded-sm p-1 pl-2 font-medium text-[#664F3D] shadow-inner"
          type="text"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="first name"
        />
        <input
          className="text-md rounded-sm p-1 pl-2 font-medium text-[#664F3D] shadow-inner"
          type="text"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="last name"
        />
        <input
          className="text-md rounded-sm p-1 pl-2 font-medium text-[#664F3D] shadow-inner"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="enter a password"
        />
        <input
          className="text-md rounded-sm p-1 pl-2 font-medium text-[#664F3D] shadow-inner"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm password"
        />
        <button
          className="rounded-2xl bg-[#eac6cc] font-semibold text-[#664F3D] shadow-inner hover:bg-[#e8b2bc]"
          type="submit"
        >
          register :3
        </button>
      </form>
      <button
        className="rounded-2xl bg-[#C8D1A0] font-semibold text-[#664F3D] shadow-inner hover:bg-[#A7B279]"
        onClick={handleLoginClick}
      >
        already have an account? login
      </button>
    </div>
  );
}
