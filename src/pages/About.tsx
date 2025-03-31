import { HouseLine } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ui/mode-toggle";

const textInfo =
  "A ideia desta aplicação surgiu da minha necessidade pessoal de organizar melhor minhas finanças. Durante muito tempo, utilizei planilhas no Excel para controlar minhas entradas, saídas, despesas recorrentes e investimentos. No entanto, queria algo mais automático e eficiente, que facilitasse minha rotina e ainda me permitisse aprimorar minhas habilidades em desenvolvimento backend e frontend. Assim, nasceu essa aplicação. A evolução do projeto foi natural. Inicialmente, era apenas para mim, mas, ao perceber que precisava criar uma planilha separada para minha parceira, tive a ideia de adicionar funcionalidades para múltiplos usuários. Isso fez com que o projeto tomasse uma dimensão maior, proporcionando um sistema que pudesse ser útil para outras pessoas que também desejam uma gestão financeira mais prática e organizada. Mas, além da técnica e da necessidade prática, essa aplicação carrega um grande significado para mim. Minha maior inspiração sempre foi minha mãe, Dona Ana, que me apoiou nos estudos e incentivou a buscar uma carreira sólida para construir uma vida melhor. Minha namorada Sara, também foi essencial nessa jornada, pois esteve ao meu lado em todos os momentos difíceis, me sustentando quando precisei e me incentivando a seguir em frente. Minha irmã Thuanny, é outra grande motivação, pois luto diariamente para ser um exemplo para ela, e sua alegria torna qualquer ambiente mais leve e feliz. E, acima de tudo, minha gratidão é a Deus, pois sem Ele nada disso seria possível. Ele me deu força, sabedoria e a própria existência para trilhar esse caminho. Essa aplicação não é apenas um sistema de controle financeiro, mas um reflexo de dedicação, aprendizado e gratidão. Espero que ela possa ajudar outras pessoas assim como tem me ajudado. Obrigado por fazer parte dessa jornada!";

export function About() {
  const navigate = useNavigate();

  return (
    <>
      <div className="p-4 flex justify-end">
        <ModeToggle />
      </div>
      <div className="w-full h-full flex justify-center p-4 text-sm lg:h-auto">
        <div className="relative w-full p-8 flex justify-center items-center rounded-lg border-2 border-[#2E7D32] lg:max-w-7xl lg:h-5/6">
          <button
            className="absolute top-4 left-4 z-10 bg-none border-none p-0 flex items-center justify-center"
            onClick={() => navigate("/")}
          >
            <HouseLine size={24} color="#808080" weight="duotone" />
          </button>
          <div className="flex flex-col items-center text-center">
            <h2 className="font-bold text-2xl text-[#2E7D32] mb-4">
              Sobre a Aplicação
            </h2>
            <p className="text-justify text-base mb-8">{textInfo}</p>
          </div>
        </div>
      </div>
    </>
  );
}
