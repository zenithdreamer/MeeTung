"use client";

import { useEffect, useState } from "react";

export function EditReceiptDate({ date, onDateChange }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const [selectedYear, setSelectedYear] = useState(
    new Date(date).getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState(
    new Date(date).getMonth() + 1,
  );
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date(date).getDate());

  useEffect(() => {
    const numDaysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const availableDays = Array.from(
      { length: numDaysInMonth },
      (_, i) => i + 1,
    );
    setDays(availableDays);

    if (selectedDay > numDaysInMonth) {
      setSelectedDay(1);
    }

    const newDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    if (newDate !== date) {
      onDateChange(newDate);
    }
  }, [selectedYear, selectedMonth, selectedDay]);

  return (
    <div className="mx-auto flex h-64">
      <div className="flex w-full flex-row items-center justify-center">
        <select
          className="m-2 w-24 flex-1 rounded-xl p-2 shadow-lg"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className="text-2xl">/</div>
        <select
          className="m-2 w-24 flex-1 rounded-xl p-2 shadow-lg"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <div className="text-2xl">/</div>
        <select
          className="m-2 w-24 flex-1 rounded-xl p-2 shadow-lg"
          value={selectedDay}
          onChange={(e) => setSelectedDay(Number(e.target.value))}
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function EditReceiptCategory({ selectedCategory, onCategoryChange }) {
  const categories = [
    "food",
    "cat",
    "dog",
    "social",
    "beauty",
    "gaming",
    "other",
  ];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const displayedCategories = categories.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <div className="mx-auto mt-4 flex h-64 flex-col items-center">
      <div className="mb-4 flex w-full items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="mx-4 mt-6 h-10 w-10 rounded-lg border-2 border-gray-700 bg-white text-2xl font-bold disabled:opacity-50"
        >
          &lt;
        </button>
        <div className="grid grid-cols-2 gap-4">
          {displayedCategories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`${
                selectedCategory === category
                  ? "w-36 rounded-2xl border-2 border-gray-700 bg-[#e6b5be] p-6 shadow-lg"
                  : "w-36 rounded-2xl border-2 border-gray-700 bg-white p-6 shadow-lg"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="mx-4 mt-6 h-10 w-10 rounded-lg border-2 border-gray-700 bg-white text-2xl font-bold disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export function EditReceiptAmount({ amount, onAmountChange }) {
  return (
    <div className="mx-auto flex h-64">
      <div className="flex w-full flex-row items-center justify-center">
        <input
          className="m-2 w-24 flex-1 rounded-xl p-2 shadow-lg"
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export function EditReceiptPayMethod({ selectedMethod, onMethodChange }) {
  const paymentMethods = [
    "cash",
    "credit",
    "bank",
    "ad",
    "sww",
    "bafenk",
    "banak",
  ];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(paymentMethods.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const displayedCategories = paymentMethods.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <div className="mx-auto mt-4 flex h-64 flex-col items-center">
      <div className="mb-4 flex w-full items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="mx-4 mt-6 h-10 w-10 rounded-lg border-2 border-gray-700 bg-white text-2xl font-bold disabled:opacity-50"
        >
          &lt;
        </button>
        <div className="grid grid-cols-2 gap-4">
          {displayedCategories.map((category, index) => (
            <button
              key={`${category}-${index}`}
              onClick={() => onMethodChange(category)}
              className={`${
                selectedMethod === category
                  ? "w-36 rounded-2xl border-2 border-gray-700 bg-[#e6b5be] p-6 shadow-lg"
                  : "w-36 rounded-2xl border-2 border-gray-700 bg-white p-6 shadow-lg"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="mx-4 mt-6 h-10 w-10 rounded-lg border-2 border-gray-700 bg-white text-2xl font-bold disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export function EditReceiptNote({ note, onNoteChange }) {
  return (
    <div className="mx-auto flex h-64">
      <div className="flex w-full flex-row items-center justify-center">
        <input
          className="m-2 w-96 flex-1 rounded-xl p-2 shadow-lg"
          type="text"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export function EditTransaction({ transaction, onTransactionChange }) {
  const [step, setStep] = useState(0);

  const stepTitles = [
    "choose date...",
    "choose category...",
    "enter amount...",
    "choose payment type...",
    "enter notes...",
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="flex h-screen max-w-full flex-col bg-gradient-to-b from-[#F1DCE0] to-[#C8D1A0]">
      <div className="flex flex-row items-center justify-between border-y-2 border-gray-600 bg-transparent p-4">
        <div className="text-left text-xl font-bold text-[#000000]">
          {stepTitles[step]}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className="rounded-lg border-2 border-gray-700 bg-white px-2 text-2xl font-bold disabled:opacity-50"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            disabled={step === 4}
            className="rounded-lg border-2 border-gray-700 bg-white px-2 text-2xl font-bold disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
      {step === 0 && (
        <EditReceiptDate
          date={transaction.date}
          onDateChange={(value) => onTransactionChange("date", value)}
        />
      )}
      {step === 1 && (
        <EditReceiptCategory
          selectedCategory={transaction.category}
          onCategoryChange={(value) => onTransactionChange("category", value)}
        />
      )}
      {step === 2 && (
        <EditReceiptAmount
          amount={transaction.amount}
          onAmountChange={(value) => onTransactionChange("amount", value)}
        />
      )}
      {step === 3 && (
        <EditReceiptPayMethod
          selectedMethod={transaction.payment}
          onMethodChange={(value) => onTransactionChange("payment", value)}
        />
      )}
      {step === 4 && (
        <EditReceiptNote
          note={transaction.note}
          onNoteChange={(value) => onTransactionChange("note", value)}
        />
      )}
    </div>
  );
}
