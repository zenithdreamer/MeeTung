// src/app/profile/page.tsx
"use client";

import { ShowTransaction } from "../_components/transaction-components/show-transaction";
import { TransactionNav } from "../_components/transaction-components/transaction-nav";

// import { useRouter } from "next/navigation";

// import { api } from "~/trpc/react";

export default function HistoryPage() {
  return (
    <div className="flex h-screen max-w-full flex-col">
      <TransactionNav />
      <ShowTransaction />
    </div>
  );
}
