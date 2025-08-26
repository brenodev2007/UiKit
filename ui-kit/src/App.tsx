import Button from "./components/button/Button";
import Navbar from "./components/navbar/NavBar";
import ButtonIcon from "./components/button/ButtonIcon";
import Checkbox from "./components/input/CheckBox";
import Textarea from "./components/input/Textarea";
import TextField from "./components/input/TextField";
import React from "react";
import { RadioGroup } from "./components/input/RadioGroup";
import { Radio } from "./components/input/Radio";
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
  const [checked, setChecked] = useState(false);
  const [options, setOptions] = useState({
    email: true,
    sms: false,
    push: false,
  });
  const [selectedValue, setSelectedValue] = React.useState("option1");

  const handleOptionChange = (option: string, isChecked: boolean) => {
    setOptions((prev) => ({ ...prev, [option]: isChecked }));
  };

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

      <div className="grid grid-cols-3 gap-4 p-10 mx-auto">
        {/* Uso controlado simples */}
        <Checkbox
          label="Termos e condições"
          checked={checked}
          onChange={(isChecked) => setChecked(isChecked)}
          variant="primary"
          animation="bounce"
        />

        {/* Com diferentes variantes */}
        <Checkbox
          label="Notificação por email"
          variant="success"
          size="lg"
          checked={options.email}
          onChange={(isChecked) => handleOptionChange("email", isChecked)}
          rounded="full"
        />

        {/* Com estado de erro */}
        <Checkbox
          label="Política de privacidade"
          variant="danger"
          error="Você deve aceitar a política"
          required
        />

        {/* Com estado de sucesso */}
        <Checkbox
          label="Configuração salva"
          variant="success"
          success="Configuração aplicada com sucesso"
          checked={true}
          readOnly
        />

        {/* Desabilitado */}
        <Checkbox
          label="Opção premium"
          variant="warning"
          disabled
          helperText="Disponível em planos superiores"
        />

        {/* Indeterminado */}
        <Checkbox
          label="Selecionar todos"
          indeterminate={true}
          helperText="Alguns itens selecionados"
        />

        {/* Customizado com classes adicionais */}
        <Checkbox
          label="Checkbox personalizado"
          containerClassName="bg-gray-50 p-4 rounded-lg"
          labelClassName="font-bold text-purple-700"
          className="items-center"
          variant="primary"
          rounded="full"
        />

        {/* Sem label visual (apenas aria) */}
        <Checkbox
          aria-label="Checkbox acessível"
          checked={checked}
          onChange={(isChecked) => setChecked(isChecked)}
        />
      </div>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Exemplo de RadioGroup</h1>

        {/* RadioGroup controlado */}
        <RadioGroup
          label="Escolha uma opção"
          value={selectedValue}
          onChange={setSelectedValue}
          helperText="Selecione a melhor opção para você"
          className="mb-6"
        >
          <Radio value="option1">Opção 1</Radio>
          <Radio value="option2">Opção 2</Radio>
          <Radio value="option3">Opção 3</Radio>
        </RadioGroup>

        {/* RadioGroup não controlado com defaultValue */}
        <RadioGroup
          label="Escolha outro grupo"
          defaultValue="default2"
          onChange={(value) => console.log("Selecionado:", value)}
          orientation="horizontal"
          className="mb-6"
        >
          <Radio value="default1">Padrão 1</Radio>
          <Radio value="default2">Padrão 2</Radio>
          <Radio value="default3">Padrão 3</Radio>
        </RadioGroup>

        {/* RadioGroup com erro */}
        <RadioGroup
          label="Opção obrigatória"
          error="Este campo é obrigatório"
          required
          className="mb-6"
        >
          <Radio value="required1">Obrigatório 1</Radio>
          <Radio value="required2">Obrigatório 2</Radio>
        </RadioGroup>

        {/* RadioGroup desabilitado */}
        <RadioGroup
          label="Opções desabilitadas"
          disabled
          helperText="Este grupo está desativado"
        >
          <Radio value="disabled1">Desabilitado 1</Radio>
          <Radio value="disabled2">Desabilitado 2</Radio>
        </RadioGroup>

        {/* Estado atual selecionado */}
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">
            Valor selecionado no primeiro grupo:{" "}
            <strong>{selectedValue}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
