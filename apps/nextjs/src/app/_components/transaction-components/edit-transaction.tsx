//"use client";

import { useEffect, useState } from "react";

import { api } from "~/trpc/react";

export function EditReceiptDate({
  date,
  onDateChange,
}: {
  date: string;
  onDateChange: (newDate: string) => void;
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const [selectedYear, setSelectedYear] = useState(
    new Date(date).getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState(
    new Date(date).getMonth() + 1,
  );
  const [days, setDays] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState(new Date(date).getDate());

  useEffect(() => {
    // If selected year, month, or day changes is not set, use date passed in from props
    if (!selectedYear || !selectedMonth || !selectedDay) {
      setSelectedYear(new Date(date).getFullYear());
      setSelectedMonth(new Date(date).getMonth() + 1);
      setSelectedDay(new Date(date).getDate());
    }

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
    console.log("newDate", newDate);
    if (newDate !== date) {
      onDateChange(newDate);
    }
  }, [selectedYear, selectedMonth, selectedDay, date, onDateChange]);

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

export function EditReceiptCategory({
  selectedCategory,
  selectedCategoryId,
  onCategoryChange,
  onCategoryIdChange,
}: {
  selectedCategory: string;
  selectedCategoryId: string;
  onCategoryChange: (name: string) => void;
  onCategoryIdChange: (id: string) => void;
}) {
  const { data: category = [], refetch } =
    api.category.getCategories.useQuery();
  const { data: currentUser } = api.user.getCurrentUser.useQuery();

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(category.length / itemsPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const createCategoryMutation = api.category.createCategory.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

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

  const handleCategoryData = (name: string, id: string) => {
    onCategoryChange(name);
    onCategoryIdChange(id);
  };

  const displayedCategories = category.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handleAddCategory = () => {
    setIsModalOpen(true);
  };

  const handleAdd = async () => {
    if (!currentUser) {
      console.error("No user found.");
      return;
    }

    try {
      await createCategoryMutation.mutateAsync({
        name: newCategoryName,
      });

      setNewCategoryName("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleCancel = () => {
    setNewCategoryName("");
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto mt-4 flex h-64 flex-col items-center">
      <div className="mb-4 flex w-full items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="mx-4 mt-6 h-10 w-10 rounded-lg border-2 border-gray-700 bg-white text-2xl font-bold disabled:opacity-50 dark:text-black"
        >
          &lt;
        </button>
        <div className="grid grid-cols-2 gap-4">
          {displayedCategories.map((method, index) => (
            <div
              key={`${method.id}-${index}`}
              className="flex items-center justify-between dark:text-black"
            >
              <button
                onClick={() => handleCategoryData(method.name, method.id)}
                className={`${
                  selectedCategoryId === method.id &&
                  selectedCategory === method.name
                    ? "w-36 rounded-2xl border-2 border-gray-700 bg-[#e6b5be] p-6 text-sm shadow-lg"
                    : "w-36 rounded-2xl border-2 border-gray-700 bg-white p-6 text-sm shadow-lg"
                }`}
              >
                {method.name}
              </button>
            </div>
          ))}

          <button
            onClick={handleAddCategory}
            className="w-36 rounded-2xl border-2  border-gray-700 bg-white p-6 shadow-lg dark:text-black"
          >
            +
          </button>
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="mx-4 mt-6 h-10 w-10 rounded-lg border-2  border-gray-700 bg-white text-2xl font-bold disabled:opacity-50 dark:text-black"
        >
          &gt;
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded- bg-gradient-to-b from-[#E9DDCD] to-[#E9C1C9] p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Add Category</h2>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="mb-4 w-full rounded border p-2"
              placeholder="Enter category name"
            />
            <div className="flex justify-between">
              <button
                onClick={handleCancel}
                className="rounded bg-red-500 px-4 py-2 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function EditReceiptAmount({
  amount,
  onAmountChange,
}: {
  amount: number;
  onAmountChange: (value: number) => void;
}) {
  return (
    <div className="mx-auto flex h-64">
      <div className="flex w-full flex-row items-center justify-center">
        <input
          className="m-2 w-24 flex-1 rounded-xl p-2 shadow-lg"
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export function EditReceiptPayMethod({
  selectedMethod,
  selectedMethodName,
  onMethodChange,
  onMethodNameChange,
}: {
  selectedMethod: string;
  selectedMethodName: string;
  onMethodChange: (id: string) => void;
  onMethodNameChange: (name: string) => void;
}) {
  const { data: paymentMethods = [], refetch } =
    api.paymentmethod.getTypes.useQuery();
  const { data: currentUser } = api.user.getCurrentUser.useQuery();

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(paymentMethods.length / itemsPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMethodName, setNewMethodName] = useState("");

  const createPaymentMethodMutation = api.paymentmethod.createType.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

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

  const handlePaymentData = (name: string, id: string) => {
    onMethodNameChange(name);
    onMethodChange(id);
  };

  const displayedMethods = paymentMethods.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handleAddPaymentMethod = () => {
    setIsModalOpen(true);
  };

  const handleAdd = async () => {
    if (!currentUser) {
      console.error("No user found.");
      return;
    }

    try {
      await createPaymentMethodMutation.mutateAsync({
        name: newMethodName,
        userId: currentUser.id,
      });

      setNewMethodName("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding payment method:", error);
    }
  };

  const handleCancel = () => {
    setNewMethodName("");
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto mt-4 flex h-64 flex-col items-center">
      <div className="mb-4 flex w-full items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="mx-4 mt-6 h-10 w-10 rounded-lg border-2 border-gray-700 bg-white text-2xl font-bold disabled:opacity-50 dark:text-black"
        >
          &lt;
        </button>

        <div className="grid grid-cols-2 gap-4">
          {displayedMethods.map((method, index) => (
            <div
              key={`${method.id}-${index}`}
              className="flex items-center justify-between dark:text-black"
            >
              <button
                onClick={() => handlePaymentData(method.name, method.id)}
                className={`${
                  selectedMethod === method.id &&
                  selectedMethodName === method.name
                    ? "w-36 rounded-2xl border-2 border-gray-700 bg-[#e6b5be] p-6 text-sm shadow-lg"
                    : "w-36 rounded-2xl border-2 border-gray-700 bg-white p-6 text-sm shadow-lg"
                }`}
              >
                {method.name}
              </button>
            </div>
          ))}

          <button
            onClick={handleAddPaymentMethod}
            className="w-36 rounded-2xl border-2 border-gray-700 bg-white p-6 shadow-lg dark:text-black"
          >
            +
          </button>
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className="mx-4 mt-6 h-10 w-10 rounded-lg border-2 border-gray-700 bg-white text-2xl font-bold disabled:opacity-50 dark:text-black"
        >
          &gt;
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded- bg-gradient-to-b from-[#E9DDCD] to-[#E9C1C9] p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">Add Payment Method</h2>
            <input
              type="text"
              value={newMethodName}
              onChange={(e) => setNewMethodName(e.target.value)}
              className="mb-4 w-full rounded border p-2"
              placeholder="Enter payment method name"
            />
            <div className="flex justify-between">
              <button
                onClick={handleCancel}
                className="rounded bg-red-500 px-4 py-2 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="rounded bg-blue-500 px-4 py-2 text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function EditReceiptNote({
  description,
  onNoteChange,
}: {
  description: string;
  onNoteChange: (value: string) => void;
}) {
  return (
    <div className="mx-auto flex h-64">
      <div className="flex w-full flex-row items-center justify-center">
        <input
          className="m-2 w-96 flex-1 rounded-xl p-2 shadow-lg"
          type="text"
          value={description}
          onChange={(e) => onNoteChange(e.target.value)}
        />
      </div>
    </div>
  );
}

interface Transaction {
  date: string;
  category: string;
  categoryId: string;
  amount: number;
  paymentMethodId: string;
  payment: string;
  description: string;
}

interface EditTransactionProps {
  transaction: Transaction;
  onTransactionChange: (
    field: keyof Transaction,
    value: string | number,
  ) => void;
}

export function EditTransaction({
  transaction,
  onTransactionChange,
}: EditTransactionProps) {
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
        <div className="flex space-x-4 dark:text-black">
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
          selectedCategoryId={transaction.categoryId}
          onCategoryChange={(value) => onTransactionChange("category", value)}
          onCategoryIdChange={(value) =>
            onTransactionChange("categoryId", value)
          }
        />
      )}
      {step === 2 && (
        <EditReceiptAmount
          amount={transaction.amount}
          onAmountChange={(value: string | number) =>
            onTransactionChange("amount", value)
          }
        />
      )}
      {step === 3 && (
        <EditReceiptPayMethod
          selectedMethod={transaction.paymentMethodId}
          selectedMethodName={transaction.payment}
          onMethodChange={(value) =>
            onTransactionChange("paymentMethodId", value)
          }
          onMethodNameChange={(value) => onTransactionChange("payment", value)}
        />
      )}
      {step === 4 && (
        <EditReceiptNote
          description={transaction.description}
          onNoteChange={(value) => onTransactionChange("description", value)}
        />
      )}
    </div>
  );
}
