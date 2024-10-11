// src/app/profile/page.tsx
"use client";

// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";
import { RiLogoutBoxLine } from "@react-icons/all-files/ri/RiLogoutBoxLine";

import { api } from "~/trpc/react";
import { CreateTransactionButton } from "./_components/history-components/create-transaction";
import { HistoryPageNavBar } from "./_components/history-components/navbar";
import { TransactionHistory } from "./_components/history-components/transactions-history";

export default function HistoryPage() {
  const router = useRouter();
  const logout = api.auth.logout.useMutation();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      await logout.mutateAsync().catch((err) => {
        console.error(err);
      });

      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  return (
    <div className="flex h-screen max-w-full flex-col">
      <HistoryPageNavBar />
      <TransactionHistory />
      <CreateTransactionButton />
      {typeof window !== "undefined" && localStorage.getItem("token") ? (
        <button
          className="absolute bottom-6 left-4 rounded-2xl p-4 text-white md:text-lg"
          onClick={handleLogout}
        >
          <RiLogoutBoxLine color="#664F3D" size="34px" />
        </button>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="rounded-xl bg-green-600 px-4 py-2 text-white shadow md:text-lg"
        >
          Login
        </button>
      )}
    </div>
  );
}
