import { useEffect, useState } from "react";
import logo from "./../assets/dollar-bag.png";
import profile from "./../assets/profile-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { HomeCards } from "./../components/HomeCards";
import cardsLogo from "./../assets/cards.svg";
import bankLogo from "./../assets/bank.svg";
import rocketLogo from "./../assets/rocket-launch.svg";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function Home() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [autoHoverActive, setAutoHoverActive] = useState<boolean>(true);
  const [lastHoveredCard, setLastHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const cardsCount = 3;
    let currentIndex = hoveredCard !== null ? hoveredCard : 0;

    const changeHoverEffect = () => {
      if (autoHoverActive) {
        setHoveredCard(currentIndex);
        currentIndex = (currentIndex + 1) % cardsCount;
      }
    };

    const intervalId = setInterval(changeHoverEffect, 1500);

    return () => clearInterval(intervalId);
  }, [autoHoverActive, hoveredCard]);

  const handleMouseEnter = (index: number) => {
    setHoveredCard(index);
    setLastHoveredCard(index);
    setAutoHoverActive(false);
  };

  const handleMouseLeave = () => {
    setAutoHoverActive(true);
    if (lastHoveredCard !== null) {
      setHoveredCard((lastHoveredCard + 1) % 3);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="w-full flex items-center p-4 justify-between">
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="h-12 ml-4" />
          <h2 className="text-xl font-bold sm:text-lg">Budgetify</h2>
        </div>
        <div className="flex items-center">
          <button className="max-w-8 mr-4" onClick={() => navigate("/login")}>
            <img src={profile} alt="profile" className="h-8" />
          </button>
          <ModeToggle />
        </div>
      </div>
      <main className="flex flex-col justify-center items-center flex-grow w-full px-4 text-center mb-8">
        <h1 className="lg:text-2xl text-xl font-bold sm:text-lg">Seu dinheiro, suas regras. Controle, planeje e cresça!</h1>
        <div className="flex flex-wrap justify-center gap-8 mt-6">
          <HomeCards
            logo={cardsLogo}
            title="Controle de Cartão de Crédito"
            content={[
              "Gerencie faturas e evite juros desnecessários",
              "Receba alertas para pagamentos e gastos",
            ]}
            isHovered={hoveredCard === 0}
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={handleMouseLeave}
          />
          <HomeCards
            logo={bankLogo}
            title="Organize suas Finanças"
            content={[
              "Acompanhe entradas e saídas em um só lugar",
              "Crie categorias personalizadas para seu dinheiro",
            ]}
            isHovered={hoveredCard === 1}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
          />
          <HomeCards
            logo={rocketLogo}
            title="Planeje seu Futuro Financeiro"
            content={[
              "Acompanhe investimentos e patrimônio",
              "Defina metas e veja seu progresso financeiro",
            ]}
            isHovered={hoveredCard === 2}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </main>
      <footer className="w-full h-full">
        <div className="h-auto flex flex-col p-4 items-center text-white font-bold bg-[#2E7D32] justify-center gap-8 lg:gap-48 lg:h-20 lg:flex-row md:h-20 md:gap-48 md:flex-row">
          <Link to="/about" className="hover:underline text-sm">Sobre</Link>
          <Link to='https://www.linkedin.com/in/victormoni/' target='/blank' className="hover:underline sm:text-sm">Linkedin</Link>
          <Link to='https://wa.me/5511943936479' target='/blank' className="hover:underline sm:text-sm">Fale Conosco</Link>
        </div>
      </footer>
    </div>
  );
}
