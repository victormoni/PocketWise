import { PlusCircle } from "phosphor-react";

interface Button {
  text: string;
}

export function Button({ text }: Button) {
  return (
    <button
      type="submit"
      className="bg-[#2E7D32] text-white h-14 flex justify-center items-center gap-2 px-4 py-2 rounded-lg border-2 border-[#2E7D32] cursor-pointer transition-all duration-200 ease-in-out hover:scale-105 hover:bg-[#388E3C]"
    >
      <PlusCircle size={16} /> {text}
    </button>
  );
}
