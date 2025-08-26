import Button from "./components/button/Button";
import Navbar from "./components/navbar/NavBar";
import ButtonIcon from "./components/button/ButtonIcon";
import { FaArrowRight, FaHeart } from "react-icons/fa";

export default function App() {
  return (
    <div className="min-h-screen justify-center bg-gradient-to-r from-blue-100 via-white to-purple-100 p-6 flex flex-col items-center gap-8 ">
      <h1 className="text-4xl font-extrabold text-blue-600 text-center animate-bounce">
        🚀 UI Kit React + Tailwind
      </h1>

      <p className="text-gray-600 text-center text-lg">
        Experimente nossos botões customizados com diferentes estilos e
        tamanhos.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        <Button variant="primary" size="md">
          Botão Primário
        </Button>
        <Button variant="secondary" size="md">
          Botão Secundário
        </Button>
        <Button variant="outline" size="lg">
          Botão Outline
        </Button>
      </div>

      <div className="flex justify-center gap-6 ">
        <Navbar />
      </div>

      <div className="flex justify-center gap-6">
        <ButtonIcon
          icon={<FaArrowRight />}
          variant="primary"
          iconPosition="right"
        />
        <ButtonIcon icon={<FaHeart />} variant="outline" text="Favoritar" />
        <ButtonIcon
          icon={<FaHeart />}
          variant="ghost"
          aria-label="Configurações"
        />
      </div>
    </div>
  );
}
