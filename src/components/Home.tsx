import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import logo from "./../assets/dollar-bag.png";
import profile from "./../assets/profile-icon.png";
import { useNavigate } from "react-router-dom";
import { HomeCards } from "./HomeCards";

import cardsLogo from "./../assets/cards.svg";
import bankLogo from "./../assets/bank.svg";
import rocketLogo from "./../assets/rocket-launch.svg";
import { HomeFooter } from "./HomeFooter";

export function HomeComponent() {
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
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <h2>Budgetify</h2>
        </div>
        <div className={styles.login}>
          <button
            className={styles.homeButton}
            onClick={() => navigate("/login")}
          >
            <img src={profile} alt="profile" />
          </button>
        </div>
      </div>
      <main className={styles.content}>
        <h1>Seu dinheiro, suas regras. Controle, planeje e cresça!</h1>
      <div className={styles.cards}>
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
      <div className={styles.footer}>
        <HomeFooter />
      </div>
    </div>
  );
}
