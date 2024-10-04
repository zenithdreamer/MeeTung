"use client";

import { useEffect, useState } from "react";

export function EditReceiptDate({ onDateChange }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(1);

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

    onDateChange(`${selectedYear}-${selectedMonth}-${selectedDay}`);
  }, [selectedYear, selectedMonth, selectedDay, onDateChange]);

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
    <div className="mx-auto flex h-64 flex-col items-center">
      <div className="mb-4 flex w-full items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="mx-4 mt-6 h-12 w-12 text-2xl font-bold disabled:opacity-50"
        >
          &lt;
        </button>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {displayedCategories.map((cat) => (
            <div
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`flex h-24 w-24 cursor-pointer items-center justify-center rounded-xl bg-white px-2 py-2 text-center font-bold shadow-lg ${selectedCategory === cat ? "border-2 border-gray-500 bg-pink-200" : ""}`}
            >
              {cat}
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
          className="mx-4 mt-6 h-12 w-12 text-2xl font-bold disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export function EditReceiptAmount({ amount, onAmountChange }) {
  // State to track which buttons are clicked
  const [clickedButtons, setClickedButtons] = useState({});

  const handleButtonClick = (value) => {
    if (value === "<") {
      onAmountChange(amount.slice(0, -1));
    } else {
      onAmountChange(amount + value);
    }

    // Mark the button as clicked
    setClickedButtons((prev) => ({
      ...prev,
      [value]: true,
    }));

    // Reset the clicked state after 0.5 seconds
    setTimeout(() => {
      setClickedButtons((prev) => ({
        ...prev,
        [value]: false,
      }));
    }, 100);
  };

  const renderButton = (value) => {
    return (
      <div
        onClick={() => handleButtonClick(value)}
        className={`m-4 flex h-16 w-16 cursor-pointer items-center justify-center rounded-xl px-2 py-2 text-center font-bold shadow-lg ${
          clickedButtons[value]
            ? "border-2 border-gray-500 bg-pink-200"
            : "bg-white"
        }`}
      >
        {value}
      </div>
    );
  };

  return (
    <div className="mx-auto flex h-64 flex-row items-center">
      <div className="flex-col">
        {[1, 2, 3].map((num) => renderButton(num))}
      </div>
      <div className="flex-col items-center">
        {[4, 5, 6].map((num) => renderButton(num))}
      </div>
      <div className="flex-col items-center">
        {[7, 8, 9].map((num) => renderButton(num))}
      </div>
      <div className="flex-col items-center">
        {renderButton(".")}
        {renderButton(0)}
        {renderButton("<")}
      </div>
    </div>
  );
}

export function EditReceiptPayment({ selectedPayment, onPaymentChange }) {
  const categories = ["cash", "card", "mobile", "crypto"];
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
    <div className="mx-auto flex h-64 flex-col items-center">
      <div className="mb-4 flex w-full items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="mx-4 mt-6 h-12 w-12 text-2xl font-bold disabled:opacity-50"
        >
          &lt;
        </button>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {displayedCategories.map((cat) => (
            <div
              key={cat}
              onClick={() => onPaymentChange(cat)}
              className={`flex h-24 w-24 cursor-pointer items-center justify-center rounded-xl bg-white px-2 py-2 text-center font-bold shadow-lg ${selectedPayment === cat ? "border-2 border-gray-500 bg-pink-200" : ""}`}
            >
              {cat}
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
          className="mx-4 mt-6 h-12 w-12 text-2xl font-bold disabled:opacity-50"
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
          type="text"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          className="rounded-lg px-2 py-4"
        />
      </div>
    </div>
  );
}

export function EditTransaction() {
  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

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

  const showlog = () => {
    console.log({
      date,
      category: selectedCategory,
      amount,
      payment: selectedPayment,
      note,
    });
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
            className="px-2 text-2xl font-bold disabled:opacity-50"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            disabled={step === 4}
            className="px-2 text-2xl font-bold disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
      {step === 0 && <EditReceiptDate onDateChange={setDate} />}
      {step === 1 && (
        <EditReceiptCategory
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}
      {step === 2 && (
        <EditReceiptAmount amount={amount} onAmountChange={setAmount} />
      )}
      {step === 3 && (
        <EditReceiptPayment
          selectedPayment={selectedPayment}
          onPaymentChange={setSelectedPayment}
        />
      )}
      {step === 4 && <EditReceiptNote note={note} onNoteChange={setNote} />}
      <div className="mt-4 flex justify-end px-4 text-lg font-bold">
        <button
          className="cursor-pointer border-2 border-black p-2"
          onClick={showlog}
        >
          DONE
        </button>
      </div>
    </div>
  );
}
