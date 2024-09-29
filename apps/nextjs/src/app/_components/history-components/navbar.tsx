"use client";

import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";

export function MonthBackButton() {
  return (
    <button className="border-1 m-auto h-fit w-fit rounded-2xl bg-[#FFFFFF] p-1 shadow-md">
      <MdKeyboardArrowLeft />
    </button>
  );
}

export function MonthNextButton() {
  return (
    <button className="border-1 m-auto h-fit w-fit rounded-2xl bg-[#FFFFFF] p-1 shadow-md">
      <MdKeyboardArrowRight />
    </button>
  );
}

export function YearLabel(props: { year?: number }) {
  return <div className="text-center text-sm font-semibold">{props.year}</div>;
}

export function HistoryPageNavBar() {
  return (
    <div className="absolute w-full border-b-2 border-b-gray-500 bg-[#E9C1C9] p-10 ">
      <div className="flex flex-row justify-center gap-20 align-middle">
        <MonthBackButton />
        <div className="flex flex-col">
          <div className="text-center text-2xl font-bold text-[#F7EDDE]">
            History
          </div>
          <YearLabel year={2024} />
        </div>
        <MonthNextButton />
      </div>
    </div>
  );
}
