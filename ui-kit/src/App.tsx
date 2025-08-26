import Button from "./components/button/Button";
import Navbar from "./components/navbar/NavBar";
import ButtonIcon from "./components/button/ButtonIcon";
import Input from "./components/input/Input";
import Textarea from "./components/input/Textarea";
import TextField from "./components/input/TextField";
import React from "react";
import { useState } from "react";
import {
  FaArrowRight,
  FaHeart,
  FaSearch,
  FaEnvelope,
  FaLock,
  FaUser,
  FaEyeSlash,
  FaEye,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";

export default function App() {
  const [bio, setBio] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
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

      <div className="grid grid-cols-4 gap-6 items-center w-full max-w-4xl">
        {/* Textarea padrão */}
        <Textarea placeholder="Escreva sua mensagem aqui..." rows={4} />

        {/* Textarea com label e contador */}
        <Textarea
          label="Biografia"
          placeholder="Conte um pouco sobre você..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={200}
          showCount
          helperText="Máximo de 200 caracteres"
        />

        {/* Textarea com erro */}
        <Textarea
          label="Comentário"
          placeholder="Deixe seu comentário"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          error={
            comment.length < 10
              ? "O comentário deve ter pelo menos 10 caracteres"
              : ""
          }
          variant="filled"
        />

        {/* Textarea com sucesso */}
        <Textarea
          label="Mensagem de sucesso"
          success="Mensagem enviada com sucesso!"
          variant="outline"
          rounded="lg"
          value="Sua mensagem de exemplo aqui..."
          readOnly
        />

        {/* Textarea desabilitado */}
        <Textarea
          label="Campo desabilitado"
          placeholder="Este campo está desabilitado"
          disabled
          helperText="Você não pode editar este campo"
        />

        {/* Textarea sem redimensionamento */}
        <Textarea
          label="Sem redimensionamento"
          placeholder="Esta textarea não pode ser redimensionada"
          resize="none"
          variant="flushed"
        />

        {/* Textarea estilo mínimo */}
        <Textarea
          placeholder="Estilo mínimo..."
          variant="unstyled"
          className="border-b border-gray-300 focus:border-blue-500"
        />
      </div>

      <div className="p-6 space-y-6 max-w-md mx-auto">
        {/* Campo de busca com ícone */}
        <TextField
          placeholder="Buscar..."
          icon={FaSearch}
          variant="outline"
          rounded="full"
        />

        {/* Campo de email com validação */}
        <TextField
          label="Email"
          type="email"
          placeholder="seu@email.com"
          icon={FaEnvelope}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={email && !/\S+@\S+\.\S+/.test(email) ? "Email inválido" : ""}
          required
        />

        {/* Campo de senha com ícone clicável */}
        <TextField
          label="Senha"
          type={showPassword ? "text" : "password"}
          placeholder="Digite sua senha"
          icon={FaLock}
          trailingIcon={showPassword ? FaEyeSlash : FaEye}
          onTrailingIconClick={() => setShowPassword(!showPassword)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="filled"
          helperText="Mínimo de 8 caracteres"
        />

        {/* Campo com contador de caracteres */}
        <TextField
          label="Biografia"
          placeholder="Conte sobre você..."
          maxLength={150}
          showCount
          variant="outline"
          rounded="lg"
        />

        {/* Campo desabilitado */}
        <TextField
          label="Usuário"
          placeholder="nomedeusuário"
          icon={FaUser}
          value="johndoe"
          disabled
          helperText="Usuário não pode ser alterado"
        />

        {/* Campo de telefone */}
        <TextField
          label="Telefone"
          type="tel"
          placeholder="(00) 00000-0000"
          icon={FaPhone}
          variant="flushed"
        />

        {/* Campo de data */}
        <TextField
          label="Data de nascimento"
          icon={FaCalendarAlt}
          iconPosition="right"
        />

        {/* Campo de sucesso */}
        <TextField
          label="Código de verificação"
          value="ABC123"
          success="Código verificado com sucesso!"
          readOnly
        />
      </div>
    </div>
  );
}
