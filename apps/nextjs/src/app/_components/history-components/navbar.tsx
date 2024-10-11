"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";

import { toast } from "@mee-tung/ui/toast";

import { api } from "~/trpc/react";

const curYear = new Date().getFullYear();

export function MonthBackButton({
  year,
  setYear,
}: {
  year: number;
  setYear: (year: number) => void;
}) {
  return (
    <button
      className="border-1 m-auto h-fit w-fit rounded-2xl bg-[#FFFFFF] p-1 shadow-md"
      onClick={() => (year > 0 ? setYear(year - 1) : setYear(year))}
    >
      <MdKeyboardArrowLeft />
    </button>
  );
}

export function MonthNextButton({
  year,
  setYear,
}: {
  year: number;
  setYear: (year: number) => void;
}) {
  return (
    <button
      className="border-1 m-auto h-fit w-fit rounded-2xl bg-[#FFFFFF] p-1 shadow-md"
      onClick={() => (year < curYear ? setYear(year + 1) : setYear(year))}
    >
      <MdKeyboardArrowRight />
    </button>
  );
}

export function YearLabel(props: { year?: number }) {
  return (
    <div className="text-center text-sm font-semibold md:text-3xl xl:text-4xl">
      {props.year}
    </div>
  );
}

export function HistoryPageNavBar() {
  const [year, setYear] = useState(curYear);
  const router = useRouter();
  const logout = api.auth.logout.useMutation();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      await logout.mutateAsync().catch((err) => {
        console.error(err);
      });

      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  return (
    <div className="absolute w-full border-b-2 border-b-gray-500 bg-[#E9C1C9] p-10 transition-all md:p-9 xl:p-8">
      <div className="flex flex-row justify-center gap-20 align-middle">
        <MonthBackButton year={year} setYear={setYear} />
        <div className="flex flex-col">
          <div className="text-center text-2xl font-bold text-[#F7EDDE] md:text-4xl xl:text-5xl">
            History
          </div>
          <YearLabel year={year} />
        </div>
        <MonthNextButton year={year} setYear={setYear} />
      </div>
    </div>
  );
}
