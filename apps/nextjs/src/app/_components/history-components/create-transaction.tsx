"use client";

import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";

export function CreateTransactionButton() {
  return (
    <a
      href="/transaction/create"
      className="absolute bottom-8 right-8 rounded-full bg-[#664F3D] p-4 shadow-md"
    >
      <AiOutlinePlus color="white" size="24px" />
    </a>
  );
}
