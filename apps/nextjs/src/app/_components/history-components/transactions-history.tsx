"use client";

import { useState } from "react";

export interface Transaction {
  date: Date;
  amount: number;
  paymentMethod: string | undefined;
  title: string | undefined;
  type: string; //expense or income
}

export interface DailyHistory {
  date: Date;
  transactions: [t: Transaction];
}

export interface WeeklyHistory {
  week: [startDate: Date, endDate: Date];
  t: Transaction;
}

export function TransactionHistory() {
  const [view, setView] = useState("daily");
  const renderTransactionHistory = () => {
    switch (view) {
      case "daily":
        return <DailyTransactionHistory />;
      case "monthly":
        return <MonthlyTransactionHistory />;
      // case "summary":
      //   return <TransactionHistorySummary />;
    }
  };
  return (
    <div className="flex h-screen max-w-full flex-col gap-2 overflow-x-hidden overflow-y-scroll bg-gradient-to-b from-[#E9DDCD] to-[#E9C1C9] p-8 pt-36 transition-all md:pt-40 xl:pt-44">
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
      <div className="flex flex-row">
        <button
          className={`flex-1 font-medium md:py-2 md:text-xl xl:py-4 ${view === "daily" ? "rounded-xl bg-[#766354] text-[#D8D6C7] shadow-inner" : " text-black"}`}
          onClick={() => changeView("daily")}
        >
          Daily
        </button>
        <button
          className={`flex-1 font-medium md:py-2 md:text-xl xl:py-4 ${view === "monthly" ? "rounded-xl bg-[#766354] text-[#D8D6C7] shadow-inner" : " text-black"}`}
          onClick={() => changeView("monthly")}
        >
          Monthly
        </button>
        {/* <button
          className={`flex-1 font-medium ${view === "summary" ? "rounded-xl bg-[#766354] text-[#D8D6C7] shadow-inner" : " text-black"}`}
          onClick={() => changeView("summary")}
        >
          Summary
        </button> */}
      </div>
    </div>
  );
}

export function TransactionHistoryTotal() {
  const totalIncome = 100.0;
  const totalExpense = 200.0;
  const total: number = totalExpense - totalIncome;
  return (
    <div className="flex-rows flex max-w-full rounded-xl border border-black bg-[#BBA384] p-2">
      <div className="flex-1 flex-col text-center md:text-lg xl:text-xl">
        <div className="font-medium">Income</div>
        <div className="text-[#FEF8ED]">{totalIncome.toFixed(2)}</div>
      </div>
      <div className="flex-1 flex-col text-center md:text-lg xl:text-xl">
        <div className="font-medium">Expense</div>
        <div className="text-[#FEF8ED]">{totalExpense.toFixed(2)}</div>
      </div>
      <div className="flex-1 flex-col text-center md:text-lg xl:text-xl">
        <div className="font-medium">Total</div>
        <div className="text-[#FEF8ED]">{total.toFixed(2)}</div>
      </div>
    </div>
  );
}

export function DailyTransactionHistory() {
  //use DailyTransactions interface to keep all transactions from each date
  const transactionExample: Transaction = {
    date: new Date("2023-09-25"),
    amount: 150.75,
    paymentMethod: "Cash",
    title: "Groceries",
    type: "expense",
  };

  return (
    <div className="flex flex-col">
      <div className="py-2">
        <div className="text-2xl font-semibold">
          {transactionExample.date
            .toUTCString()
            .split(" ")
            .slice(0, 3)
            .join(" ")}
        </div>
        <div className="flex flex-col gap-2 py-3">
          <DailyTransaction t={transactionExample} />
          <DailyTransaction t={transactionExample} />
          <DailyTransaction t={transactionExample} />
          {/* in the real thing have to loop through each day*/}
        </div>
      </div>
    </div>
  );
}

export function MonthlyTransactionHistory() {
  const monthlyTransactions: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //get the weekly expenses in each month and store in WeeklyHistory
  return (
    <div className="flex flex-col">
      {monthlyTransactions.map((month, index) => (
        <div key={index} className="py-2">
          <div className="text-xl font-semibold md:text-2xl xl:text-3xl">
            {month}
          </div>
          <div className="flex flex-col gap-2 py-3">
            <MonthlyTransaction />
            {/* in the real thing have to loop */}
          </div>
        </div>
      ))}
    </div>
  );
}

//haven't thought of what to do with summary but three buttons look good
export function TransactionHistorySummary() {
  return <p>summary</p>;
}

export function DailyTransaction({ t }: { t: Transaction }) {
  //displays information of a single transaction
  return (
    <div className="flex flex-col rounded-xl border bg-[#FEF8ED] p-4 md:text-2xl xl:text-3xl">
      <div className="text-md font-medium">{t.title}</div>
      <div className="flex justify-between text-sm md:text-xl xl:text-2xl">
        <div className="flex-1 text-left">{t.paymentMethod}</div>
        <div className="flex-none text-right">{t.amount}</div>
      </div>
    </div>
  );
}

export function MonthlyTransaction() {
  //use WeeklyHistory
  const weeks: (string | number)[][] = [
    ["week1", 100],
    ["week2", 200],
    ["week3", 200],
    ["week4", 100],
  ];
  return (
    <div className="flex flex-col rounded-xl">
      <div className="r flex flex-row gap-2 rounded-t-xl border border-black bg-[#715F51] p-4 text-center md:text-2xl xl:text-3xl">
        <div className="flex flex-1 text-center text-[#FEF8ED]">range</div>
        <div className=" text-[#FEF8ED]">income</div>
        <div className=" text-[#FEF8ED]">expense</div>
      </div>
      <WeeklyTransaction week={weeks[0]} isLast={false} />
      <WeeklyTransaction week={weeks[1]} isLast={false} />
      <WeeklyTransaction week={weeks[2]} isLast={false} />
      <WeeklyTransaction week={weeks[3]} isLast={true} />
    </div>
  );
}

export function WeeklyTransaction({
  isLast,
  week,
}: {
  isLast: boolean;
  week: (string | number)[];
}) {
  return (
    <div
      className={`flex flex-row border-b border-l border-r border-black bg-[#FEF8ED] p-4 md:text-xl xl:text-2xl ${isLast ? "rounded-b-xl" : ""}`}
    >
      <div className="text-md flex-1 text-start font-medium">{week[0]}</div>
      <div className="align-center text-md flex-1 text-end">{week[1]}</div>
    </div>
  );
}
