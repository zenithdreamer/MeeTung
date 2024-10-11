"use client";

export function ReceiptDate({ date }) {
  return (
    <div className="flex items-center border-b-2 border-dotted border-[#A7B279] pr-6 pt-2 text-left text-base">
      <div className="text-[#A7B279]">DATE: </div>
      <div className="ml-2 text-black">{date}</div>
    </div>
  );
}

export function ReceiptCategory({ category }) {
  return (
    <div className="flex items-center border-b-2 border-dotted border-[#A7B279] pr-6 pt-2 text-left text-base">
      <div className="text-[#A7B279]">CATEGORY: </div>
      <div className="ml-2 text-black">{category}</div>
    </div>
  );
}

export function ReceiptAmount({ amount }) {
  return (
    <div className="flex items-center border-b-2 border-dotted border-[#A7B279] pr-6 pt-2 text-left text-base">
      <div className="text-[#A7B279]">AMOUNT: </div>
      <div className="ml-2 text-black">{amount}</div>
    </div>
  );
}

export function ReceiptPayMethod({ paymentMethod }) {
  return (
    <div className="flex items-center border-b-2 border-dotted border-[#A7B279] pr-6 pt-2 text-left text-base">
      <div className="text-[#A7B279]">PAY METHOD: </div>
      <div className="ml-2 text-black">{paymentMethod}</div>
    </div>
  );
}

export function ReceiptNote({ description }) {
  return (
    <div className="flex items-center border-b-2 border-dotted border-[#A7B279] pr-4 pt-2 text-left text-base">
      <div className="text-[#A7B279]">NOTE: </div>
      <div className="ml-2 text-black">{description}</div>
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

export function ShowReceipt({ transaction }) {
  return (
    <div className="mx-auto flex bg-white shadow-lg">
      <div className="flex w-80 flex-col bg-[#F8F9FA] p-8 text-center md:text-2xl xl:text-3xl">
        <div className="w-full flex-1 px-8 py-4 text-center text-xl font-bold text-[#000000]">
          MEETUNG
        </div>
        <ReceiptDate date={transaction.date} />
        <ReceiptCategory category={transaction.category} />
        <ReceiptAmount amount={transaction.amount} />
        <ReceiptPayMethod paymentMethod={transaction.payment} />
        <ReceiptNote description={transaction.description} />
        <ReceiptThank />
      </div>
    </div>
  );
}

export function ShowTransaction({ transaction }) {
  return (
    <div className="flex h-screen max-w-full bg-[#F1DCE0]">
      <div className="flex flex-1 items-center justify-center">
        <ShowReceipt transaction={transaction} />
      </div>
    </div>
  );
}
