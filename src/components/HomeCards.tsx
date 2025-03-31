interface ICards {
  logo: string;
  title: string;
  content: string[];
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function HomeCards({
  logo,
  title,
  content,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: ICards) {
  return (
    <div
      className={`rounded-lg border border-[#2E7D32] p-6 flex flex-col items-center 
      shadow-[8px_8px_16px_rgba(0,0,0,0.5)] dark:shadow-[6px_6px_12px_rgba(50,50,50,0.7)] opacity-50 transition-all duration-300 
      max-w-[300px] min-h-[350px] sm:max-w-[250px] sm:min-h-[300px] md:max-w-[280px] md:min-h-[320px] lg:max-w-[300px] lg:min-h-[350px]
      ${isHovered ? 'shadow-[12px_12px_24px_rgba(0,0,0,0.7)] dark:shadow-[8px_8px_16px_rgba(50,50,50,0.8)] opacity-100 scale-105' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={logo} alt="logo" className="my-4 max-w-12 sm:max-w-10" />
      <h3 className="mb-8 font-bold text-xl text-center text-[#2E7D32] sm:text-lg md:text-xl">
        {title}
      </h3>
      <div className="flex flex-col gap-6 justify-center items-center w-[90%] text-center sm:gap-4">
        {content.map((item, index) => (
          <p key={index} className="text-base leading-relaxed sm:text-sm md:text-base">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
