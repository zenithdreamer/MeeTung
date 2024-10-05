// src/app/profile/page.tsx
"use client";

import { useState } from "react";

import { EditTransaction } from "../_components/transaction-components/edit-transaction";
import { ShowTransaction } from "../_components/transaction-components/show-transaction";
import { TransactionNav } from "../_components/transaction-components/transaction-nav";

// Function to get today's date in 'YYYY-MM-DD' format
const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function HistoryPage() {
  const [transaction, setTransaction] = useState({
    date: getTodayDate(),
    category: "",
    amount: "",
    payment: "",
    note: "",
  });

  const handleTransactionChange = (key, value) => {
    setTransaction((prev) => ({ ...prev, [key]: value }));
  };

  function showlog() {
    console.log(transaction);
  }

  return (
    <div className="flex h-screen max-w-full flex-col">
      <TransactionNav />
      <ShowTransaction transaction={transaction} />
      <EditTransaction
        transaction={transaction}
        onTransactionChange={handleTransactionChange}
      />
      <div className="flex justify-end bg-[#C8D1A0] px-4 text-lg font-bold">
        <button
          className="mb-4 cursor-pointer rounded-lg border-2 border-black bg-white p-2"
          onClick={showlog}
        >
          DONE
        </button>
      </div>
    </div>
  );
}
