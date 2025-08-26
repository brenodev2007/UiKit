import Button from "./components/button/Button";
import Navbar from "./components/navbar/NavBar";
import ButtonIcon from "./components/button/ButtonIcon";
import Input from "./components/input/Input";
import {
  FaArrowRight,
  FaHeart,
  FaSearch,
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa";

export default function App() {
  return (
    <div className="min-h-screen justify-center bg-gradient-to-r from-blue-100 via-white to-purple-100 p-6 flex flex-col items-center gap-8 ">
      <div className="flex justify-center gap-6 ">
        <Navbar />
      </div>
      <h1 className="text-4xl font-extrabold text-blue-600 text-center animate-bounce">
        🚀 UI Kit React + Tailwind
      </h1>

      <p className="text-gray-600 text-center text-lg">
        Experimente nossos botões customizados com diferentes estilos e
        tamanhos.
      </p>

      <div className="flex flex-wrap justify-center gap-6 ">
        <Button variant="primary" size="lg" rounded="full" shadow="lg">
          Começar Agoraaaaa
        </Button>
        <Button variant="danger" loading={true} disabled={true}>
          Excluir Permanentemente
        </Button>
        <Button variant="outline" size="sm" fullWidth={true}>
          Download
        </Button>
        <Button
          variant="ghost"
          size="xs"
          rounded="full"
          aria-label="Configurações"
          children={<FaArrowRight />}
        />

        <Button variant="success" size="md" shadow="none">
          Confirmar Pedido
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-10">
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

      <div className="p-6 space-y-6 max-w-md mx-auto">
        {/* Input padrão */}
        <Input placeholder="Buscar..." icon={FaSearch} />

        {/* Input com label e erro */}
        <Input
          label="Email"
          type="email"
          placeholder="seu@email.com"
          icon={FaEnvelope}
          error="Email inválido"
          required
        />

        {/* Input de senha */}
        <Input
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          icon={FaLock}
          variant="filled"
        />

        {/* Input com sucesso */}
        <Input
          label="Nome de usuário"
          placeholder="Seu nome de usuário"
          icon={FaUser}
          success="Nome disponível"
          variant="flushed"
        />

        {/* Input desabilitado */}
        <Input
          placeholder="Campo desabilitado"
          disabled
          variant="outline"
          rounded="full"
        />

        {/* Input sem ícone */}
        <Input
          label="Telefone"
          type="tel"
          placeholder="(00) 00000-0000"
          helperText="Digite apenas números"
          size="lg"
        />
      </div>
    </div>
  );
}
