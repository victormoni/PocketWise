import styles from "./About.module.css";
import destiny from "./../assets/destiny.svg";
import github from "./../assets/github.png";
import { Heart, HouseLine } from "phosphor-react";
import { useNavigate } from "react-router-dom";

const textInfo =
  "A ideia desta aplicação surgiu da minha necessidade pessoal de organizar melhor minhas finanças. Durante muito tempo, utilizei planilhas no Excel para controlar minhas entradas, saídas, despesas recorrentes e investimentos. No entanto, queria algo mais automático e eficiente, que facilitasse minha rotina e ainda me permitisse aprimorar minhas habilidades em desenvolvimento backend e frontend. Assim, nasceu essa aplicação. A evolução do projeto foi natural. Inicialmente, era apenas para mim, mas, ao perceber que precisava criar uma planilha separada para minha parceira, tive a ideia de adicionar funcionalidades para múltiplos usuários. Isso fez com que o projeto tomasse uma dimensão maior, proporcionando um sistema que pudesse ser útil para outras pessoas que também desejam uma gestão financeira mais prática e organizada. Mas, além da técnica e da necessidade prática, essa aplicação carrega um grande significado para mim. Minha maior inspiração sempre foi minha mãe, Dona Ana, que me apoiou nos estudos e incentivou a buscar uma carreira sólida para construir uma vida melhor. Minha namorada Sara, também foi essencial nessa jornada, pois esteve ao meu lado em todos os momentos difíceis, me sustentando quando precisei e me incentivando a seguir em frente. Minha irmã Thuanny, é outra grande motivação, pois luto diariamente para ser um exemplo para ela, e sua alegria torna qualquer ambiente mais leve e feliz. E, acima de tudo, minha gratidão é a Deus, pois sem Ele nada disso seria possível. Ele me deu força, sabedoria e a própria existência para trilhar esse caminho. Essa aplicação não é apenas um sistema de controle financeiro, mas um reflexo de dedicação, aprendizado e gratidão. Espero que ela possa ajudar outras pessoas assim como tem me ajudado. Obrigado por fazer parte dessa jornada!";

export function AboutComponent() {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button className={styles.homeButton} onClick={() => navigate("/")}>
          <HouseLine size={24} color="#808080" weight="duotone" />
        </button>
        <div className={styles.info}>
          <h2>Sobre a Aplicação</h2>
          <p>{textInfo}</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.profileContent}>
          <img src={destiny} alt="destiny" />
          <p>Sinta se livre para visualizar e adicionar sugestões no projeto</p>
          <a
            href="https://github.com/PatrickMeirelles/budgetify"
            target="/blank"
          >
            <img src={github} alt="github" />
          </a>
          <div className={styles.author}>
            <p>
              Projeto feito com{" "}
              <Heart size={18} color="#2e7d32" weight="fill" />
            </p>
            <p>Por Patrick Meirelles</p>
          </div>
        </div>
      </div>
    </div>
  );
}
