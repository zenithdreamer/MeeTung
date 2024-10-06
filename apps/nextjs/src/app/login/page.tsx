import { Suspense } from "react";
import Link from "next/link";

import { LoginForm } from "../_components/login/login-form";

export const runtime = "nodejs";

export default function HomePage() {
  return (
    <div>
      <div className="absolute top-8 w-full text-center text-5xl font-bold">
        m e e t u n g ₊ ⊹
      </div>
      <div className="m-auto flex h-screen w-full bg-gradient-to-b from-[#C8D1A0] via-[#F1DCE0] to-[#FFFCF7]">
        <LoginForm />
      </div>
    </div>
  );
}
