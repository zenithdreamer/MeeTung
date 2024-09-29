"use client";

import { useState } from "react";

interface Transaction {
  date: Date;
  amount: number;
  paymentMethod: string;
  title: string;
  type: string; //expense or income
}

export function TransactionHistory() {
  const [view, setView] = useState("daily");
  const renderTransactionHistory = () => {
    switch (view) {
      case "daily":
        return <DailyTransactionHistory />;
      case "monthly":
        return <MonthlyTransactionHistory />;
      case "summary":
        return <TransactionHistorySummary />;
    }
  };
  return (
    <div className="my-28 flex min-h-full max-w-full flex-col gap-2 overflow-x-hidden overflow-y-scroll bg-gradient-to-b from-[#E9DDCD] to-[#E9C1C9] p-8">
      <TransactionHistoryNav changeView={setView} view={view} />
      <TransactionHistoryTotal />
      {renderTransactionHistory()}
    </div>
  );
}

export function TransactionHistoryNav({
  changeView,
  view,
}: {
  changeView: (view: string) => void;
  view: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-2">
        <button
          className={`flex-1 font-medium ${view === "daily" ? "rounded-xl bg-[#766354] text-[#D8D6C7] shadow-inner" : " text-black"}`}
          onClick={() => changeView("daily")}
        >
          Daily
        </button>
        <button
          className={`flex-1 font-medium ${view === "monthly" ? "rounded-xl bg-[#766354] text-[#D8D6C7] shadow-inner" : " text-black"}`}
          onClick={() => changeView("monthly")}
        >
          Monthly
        </button>
        <button
          className={`flex-1 font-medium ${view === "summary" ? "rounded-xl bg-[#766354] text-[#D8D6C7] shadow-inner" : " text-black"}`}
          onClick={() => changeView("summary")}
        >
          Summary
        </button>
      </div>
    </div>
  );
}

export function TransactionHistoryTotal() {
  return (
    <div className="flex-rows flex max-w-full rounded-xl border border-black bg-[#BBA384] p-2">
      <div className="flex-1 flex-col text-center">
        <div className="font-medium">Income</div>
        <div className="text-[#FEF8ED]">78.00</div>
      </div>
      <div className="flex-1 flex-col text-center">
        <div className="font-medium">Expense</div>
        <div className="text-[#FEF8ED]">78.00</div>
      </div>
      <div className="flex-1 flex-col text-center">
        <div className="font-medium">Total</div>
        <div className="text-[#FEF8ED]">78.00</div>
      </div>
    </div>
  );
}

export function DailyTransactionHistory() {
  const dailyTransactions: string[] = ["Date 1", "Date 2", "Date 3"];
  //   const dailyTransactions: Map<Date, Transaction[]>

  return (
    <div className="flex flex-col">
      {dailyTransactions.map((transaction, index) => (
        <div key={index} className="py-2">
          <div className="text-xl font-semibold">{transaction}</div>
          <div className="flex flex-col gap-2 py-2">
            <DailyTransaction />
            <DailyTransaction />
            <DailyTransaction />
          </div>
        </div>
      ))}
    </div>
  );
}

export function MonthlyTransactionHistory() {
  return <p>monthly</p>;
}

export function TransactionHistorySummary() {
  return <p>summary</p>;
}

export function DailyTransaction() {
  return (
    <div className="flex flex-col rounded-xl border bg-[#FEF8ED] p-4 ">
      <div className="">Transaction Title</div>
      <div className="flex justify-between">
        <div className="flex-1 text-left">Payment Method</div>
        <div className="flex-none text-right">Amount</div>
      </div>
    </div>
  );
}
