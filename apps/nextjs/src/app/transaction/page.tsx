"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "@mee-tung/ui/toast";

import { api } from "~/trpc/react";
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
    categoryId: "",
    category: "",
    amount: 0,
    paymentMethodId: "",
    payment: "",
    description: "",
  });

  const handleTransactionChange = (key, value) => {
    setTransaction((prev) => ({ ...prev, [key]: value }));
  };

  const createTransaction =
    api.transaction.createTransactionSchema.useMutation();
  const { data: currentUser } = api.user.getCurrentUser.useQuery();

  const router = useRouter();

  const handleDone = async () => {
    if (!currentUser) {
      console.error("No user found.");
      return;
    }

    try {
      await createTransaction.mutateAsync({
        amount: transaction.amount,
        categoryId: transaction.categoryId,
        paymentMethodId: transaction.paymentMethodId,
        description: transaction.description,
        userId: currentUser.id,
      });
      toast("Transaction Added");
      router.push("/");
    } catch (error) {
      console.error("Error adding Transaction:", error);
    }
  };

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
          onClick={handleDone}
        >
          DONE
        </button>
      </div>
    </div>
  );
}
