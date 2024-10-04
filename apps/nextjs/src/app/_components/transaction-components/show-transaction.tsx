"use client";

export function ReceiptDate() {
  const date = 12;
  const month = "SEP";
  const year = 2032;
  const day = "SUNDAY";

  return (
    <div className="flex items-center border-b-2 border-dotted border-[#A7B279] pr-6 pt-2 text-left text-base">
      <div className="text-[#A7B279]">DATE: </div>
      <div className="ml-2 text-black">
        {day}, {month} {date}, {year}
      </div>
    </div>
  );
}

export function ReceiptCategory() {
  const category = "FOOD";

  return (
    <div className="flex items-center border-b-2 border-dotted border-[#A7B279] pr-6 pt-2 text-left text-base">
      <div className="text-[#A7B279]">CATEGORY: </div>
      <div className="ml-2 text-black">{category}</div>
    </div>
  );
}

export function ReceiptAmount() {
  const amount = 50023;

  return (
    <div className="flex items-center border-b-2 border-dotted border-[#A7B279] pr-6 pt-2 text-left text-base">
      <div className="text-[#A7B279]">AMOUNT: </div>
      <div className="ml-2 text-black">{amount} $</div>
    </div>
  );
}

export function ReceiptPayMethod() {
  const type = "CASH";

  return (
    <div className="flex items-center border-b-2 border-dotted border-[#A7B279] pr-6 pt-2 text-left text-base">
      <div className="text-[#A7B279]">PAY METHOD: </div>
      <div className="ml-2 text-black">{type} </div>
    </div>
  );
}

export function ReceiptNote() {
  const note = "WOW, YUMMY";

  return (
    <div className="flex items-center border-b-2 border-dotted border-[#A7B279] pr-4 pt-2 text-left text-base">
      <div className="text-[#A7B279]">NOTE: </div>
      <div className="ml-2 text-black">{note} </div>
    </div>
  );
}

export function ReceiptThank() {
  return (
    <div className="flex w-full items-center justify-center pt-6 text-center text-lg">
      <div className="text-[#A7B279]">THANK YOU</div>
    </div>
  );
}

export function ShowReceipt() {
  return (
    <div className="mx-auto flex bg-white shadow-lg">
      <div className="flex w-max flex-col bg-[#F8F9FA] p-8 text-center md:text-2xl xl:text-3xl">
        <div className="w-full flex-1 px-8 py-4 text-center text-xl font-bold text-[#000000]">
          MEETUNG
        </div>
        <ReceiptDate />
        <ReceiptCategory />
        <ReceiptAmount />
        <ReceiptPayMethod />
        <ReceiptNote />
        <ReceiptThank />
      </div>
    </div>
  );
}

export function ShowTransaction() {
  return (
    <div className="flex h-screen max-w-full bg-[#F1DCE0]">
      <div className="flex flex-1 items-center justify-center">
        <ShowReceipt />
      </div>
    </div>
  );
}
