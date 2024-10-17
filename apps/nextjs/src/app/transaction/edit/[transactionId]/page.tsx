"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "@mee-tung/ui/toast";

import { EditTransaction } from "~/app/_components/transaction-components/edit-transaction";
import { ShowTransaction } from "~/app/_components/transaction-components/show-transaction";
import { TransactionNav } from "~/app/_components/transaction-components/transaction-nav";
import { api } from "~/trpc/react";

interface Transaction {
  date: string;
  category: string;
  categoryId: string;
  amount: number;
  paymentMethodId: string;
  payment: string;
  description: string;
}

// Function to convert Date to String with timezone consideration
export function getDateString(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function EditTransactionPage({
  params,
}: {
  params: { transactionId: string };
}) {
  const router = useRouter();
  const { transactionId } = params;

  const [transaction, setTransaction] = useState<Transaction>({
    date: "",
    categoryId: "",
    category: "",
    amount: 0,
    paymentMethodId: "",
    payment: "",
    description: "",
  });
  const [category, setCategory] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data: currentUser } = api.user.getCurrentUser.useQuery();
  const editTransaction = api.transaction.editTransaction.useMutation();
  const {
    data: getTransaction,
    isLoading,
    isError,
  } = api.transaction.getTransactionById.useQuery({ transactionId });

  const { data: categoryry } = api.category.getCategoryById.useQuery(
    { id: getTransaction?.categoryId ?? "" },
    {
      enabled: !!getTransaction,
    },
  );

  const { data: paymentt } = api.paymentmethod.getTypeById.useQuery(
    { id: getTransaction?.paymentMethodId ?? "" },
    {
      enabled: !!getTransaction, // Only run the query if `getTransaction` is not null/undefined
    },
  );

  useEffect(() => {
    if (getTransaction) {
      if (!getTransaction.categoryId) {
        console.error("Transaction has no category.");
        return;
      }

      if (!getTransaction.paymentMethodId) {
        console.error("Transaction has no payment method.");
        return;
      }

      if (typeof Number(getTransaction.amount) !== "number") {
        console.error("Transaction amount is not a number.");
        return;
      }

      if (!categoryry) {
        console.error("Category not found.");
        return;
      }

      if (!paymentt) {
        console.error("Payment method not found.");
        return;
      }

      setTransaction({
        date: getDateString(getTransaction.createdAt),
        categoryId: getTransaction.categoryId,
        category: categoryry.name,
        amount: Number(getTransaction.amount),
        paymentMethodId: getTransaction.paymentMethodId,
        payment: paymentt.name,
        description: getTransaction.description ?? "",
      });
    }
  }, [getTransaction, category, payment, categoryry, paymentt]);

  useEffect(() => {
    if (categoryry) {
      console.log("hello", categoryry.name);
      setCategory(categoryry.name);
    }
  }, [categoryry]);

  useEffect(() => {
    if (paymentt) {
      console.log("hellojello", paymentt.name);
      setPayment(paymentt.name);
    }
  }, [paymentt]);

  if (!transactionId) {
    return <div>Error: Transaction ID is missing.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>; // Display loading state
  }

  if (isError) {
    return <div>Error fetching transaction.</div>;
  }

  if (getTransaction) {
    console.log(getTransaction.categoryId);
  }

  const handleTransactionChange = (
    key: keyof Transaction,
    value: string | number,
  ) => {
    console.log("key", key, "value", value);
    setTransaction((prev) => ({
      ...prev,
      [key]: value,
    }));
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
