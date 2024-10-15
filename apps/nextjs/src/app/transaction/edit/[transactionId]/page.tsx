"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "@mee-tung/ui/toast";

import { EditTransaction } from "~/app/_components/transaction-components/edit-transaction";
import { ShowTransaction } from "~/app/_components/transaction-components/show-transaction";
import { TransactionNav } from "~/app/_components/transaction-components/transaction-nav";
import { api } from "~/trpc/react";

// Function to convert Date to String
export function getDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function EditTransactionPage({ params }) {
  const router = useRouter();
  const { data: currentUser } = api.user.getCurrentUser.useQuery();
  const { transactionId } = params;

  if (!transactionId) {
    return <div>Error: Transaction ID is missing.</div>;
  }

  const {
    data: getTransaction,
    isLoading,
    isError,
  } = api.transaction.getTransactionById.useQuery({ transactionId });

  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    if (getTransaction) {
      setTransaction({
        date: getDateString(getTransaction.createdAt),
        categoryId: getTransaction.categoryId,
        category: "", // Assuming you want to set this later
        amount: getTransaction.amount,
        paymentMethodId: getTransaction.paymentMethodId,
        payment: "", // Assuming you want to set this later
        description: getTransaction.description,
      });
    }
  }, [getTransaction]);

  const editTransaction = api.transaction.editTransaction.useMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleTransactionChange = (key, value) => {
    setTransaction((prev) => ({ ...prev, [key]: value }));
  };

  const handleDone = async () => {
    if (!currentUser) {
      console.error("No user found.");
      return;
    }

    setIsEditing(true);

    try {
      if (getTransaction) {
        await editTransaction.mutateAsync({
          id: getTransaction.id,
          amount: Number(transaction.amount),
          description: transaction.description,
          paymentMethodId: transaction.paymentMethodId,
          categoryId: transaction.categoryId,
        });
      }
      toast("Transaction Edited");
      router.push("/");
    } catch (error) {
      console.error("Error Editing Transaction:", error);
      toast.error("Error Editing Transaction. Please try again.");
    } finally {
      setIsEditing(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (isError) {
    return <div>Error fetching transaction.</div>;
  }

  // Check if transaction is null
  if (!transaction) {
    return <div>No transaction found.</div>; // Handle case where transaction is not set
  }

  // Log the current transaction state before rendering
  console.log("Current Transaction State:", transaction);

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
          disabled={isEditing}
        >
          DONE
        </button>
      </div>
    </div>
  );
}
