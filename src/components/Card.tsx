interface CardProps {
  title?: string;
  content: string | number;
  category?: 'income' | 'expense' | 'available';
}

export function Card({ title, content, category }: CardProps) {
  let categoryClass = "";
  if (category === "income") categoryClass = "text-green-500";
  else if (category === "expense") categoryClass = "text-red-500";
  else if (category === "available") {
    categoryClass =
      typeof content === "number" && content > 0
        ? "text-green-500"
        : "text-red-500";
  }

  let formattedContent: string = typeof content === "string" ? content : content.toString();
  if (!isNaN(Number(content))) {
    formattedContent = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(content));
  }

  return (
    <div className="flex flex-col justify-center w-full h-full p-6 rounded-[10px] shadow-[6px_6px_12px_rgba(0,0,0,0.2)] opacity-50 transition-all duration-300 ease-in-out">
      <h2 className="w-full text-sm font-medium text-center lg:text-2xl">{title}</h2>
      <div className={`w-full text-xl font-bold text-center lg:text-3xl ${categoryClass}`}>
        {formattedContent}
      </div>
    </div>
  );
}
