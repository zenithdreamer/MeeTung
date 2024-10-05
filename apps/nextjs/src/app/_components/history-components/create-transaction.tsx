"use client";

import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";

export function CreateTransactionButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push("/transaction");
      }}
      className="absolute bottom-8 right-8 rounded-full bg-[#664F3D] p-4 shadow-md"
    >
      <AiOutlinePlus color="white" size="24px" />
    </button>
  );
}
