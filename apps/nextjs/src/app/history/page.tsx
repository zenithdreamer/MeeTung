// src/app/profile/page.tsx
"use client";

// import { useRouter } from "next/navigation";
import { CreateTransactionButton } from "../_components/history-components/create-transaction";
import { HistoryPageNavBar } from "../_components/history-components/navbar";
import { TransactionHistory } from "../_components/history-components/transactions-history";

// import { api } from "~/trpc/react";

export default function HistoryPage() {
  return (
    <div className="flex h-screen max-w-full flex-col">
      <HistoryPageNavBar />
      <TransactionHistory />
      <CreateTransactionButton />
    </div>
  );
}
