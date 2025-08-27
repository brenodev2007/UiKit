import { useState } from "react";
import Tooltip from "./components/feedbacks/Tooltip";
import Button from "./components/button/Button";

export default function App() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 bg-gray-100">
      {/* Tooltip no hover */}
      <Tooltip content="Este é um botão de teste" position="top" delay={300}>
        <Button variant="primary" size="md">
          Hover aqui
        </Button>
      </Tooltip>

      {/* Tooltip em texto */}
      <Tooltip content="Mensagem explicativa" position="right">
        <span className="underline cursor-pointer text-blue-600">
          Passe o mouse aqui
        </span>
      </Tooltip>

      {/* Tooltip com ação de click */}
      <Tooltip content={`Você clicou ${clickCount} vezes`} position="bottom">
        <Button
          variant="secondary"
          onClick={() => setClickCount((prev) => prev + 1)}
        >
          Clique aqui
        </Button>
      </Tooltip>
    </div>
  );
}
