// src/app/profile/page.tsx
"use client";

// import { useRouter } from "next/navigation";
import { HistoryPageNavBar } from "../_components/history-components/navbar";
import { TransactionHistory } from "../_components/history-components/transactions-history";

// import { api } from "~/trpc/react";

export default function HistoryPage() {
  return (
    <div className="flex h-screen max-w-full flex-col">
      <HistoryPageNavBar />
      <TransactionHistory />
    </div>
  );
}
