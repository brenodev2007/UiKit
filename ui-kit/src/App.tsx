import Button from "./components/button/Button";
import Navbar from "./components/navbar/NavBar";
import ButtonIcon from "./components/button/ButtonIcon";
import Checkbox from "./components/input/CheckBox";
import Textarea from "./components/input/Textarea";
import TextField from "./components/input/TextField";
import Toggle from "./components/input/Toggle";
import Select from "./components/input/SelectDropDown";
import React from "react";
import { RadioGroup } from "./components/input/RadioGroup";
import { Radio } from "./components/input/Radio";
import { FiUser, FiStar } from "react-icons/fi";
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
  FaMoon,
  FaBell,
  FaWifi,
  FaBluetooth,
} from "react-icons/fa";

export default function App() {
  const [bio, setBio] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [notifications, setNotifications] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [options, setOptions] = useState({
    email: true,
    sms: false,
    push: false,
  });

  const [multipleValues, setMultipleValues] = useState({
    user: "",
    category: "",
    status: "",
  });

  const users = [
    { value: "1", label: "João Silva", icon: <FiUser /> },
    { value: "2", label: "Maria Santos", icon: <FiUser /> },
    { value: "3", label: "Pedro Costa", icon: <FiUser /> },
  ];

  const categories = [
    { value: "tech", label: "Tecnologia" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "support", label: "Suporte" },
  ];

  const statusOptions = [
    {
      value: "active",
      label: "Ativo",
      icon: <FiStar className="text-green-500" />,
    },
    {
      value: "inactive",
      label: "Inativo",
      icon: <FiStar className="text-gray-400" />,
    },
    {
      value: "pending",
      label: "Pendente",
      icon: <FiStar className="text-yellow-500" />,
    },
  ];
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

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-md mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Configurações
          </h1>

          {/* Cada toggle com seu próprio estado e handler */}
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <Toggle
              checked={notifications}
              onChange={setNotifications}
              label={
                <div className="flex items-center gap-2">
                  <FaBell className="w-4 h-4" />
                  Notificações
                </div>
              }
              variant="primary"
              withIcons
            />

            <Toggle
              checked={wifi}
              onChange={setWifi}
              label={
                <div className="flex items-center gap-2">
                  <FaWifi className="w-4 h-4" />
                  Wi-Fi
                </div>
              }
              variant="success"
              withIcons
            />

            <Toggle
              checked={bluetooth}
              onChange={setBluetooth}
              label={
                <div className="flex items-center gap-2">
                  <FaBluetooth className="w-4 h-4" />
                  Bluetooth
                </div>
              }
              variant="warning"
              withIcons
            />

            <Toggle
              checked={darkMode}
              onChange={setDarkMode}
              label={
                <div className="flex items-center gap-2">
                  <FaMoon className="w-4 h-4" />
                  Modo Escuro
                </div>
              }
              variant="neutral"
              withIcons
            />

            <Toggle
              checked={airplaneMode}
              onChange={setAirplaneMode}
              label="Modo Avião"
              variant="danger"
              withIcons
              onIcon="✈"
              offIcon="✈"
            />
          </div>

          {/* Grupo de toggles com diferentes tamanhos */}
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <h2 className="font-medium text-gray-700">Tamanhos</h2>

            <Toggle
              checked={true}
              onChange={() => {}}
              label="Pequeno"
              size="sm"
            />

            <Toggle
              checked={true}
              onChange={() => {}}
              label="Médio"
              size="md"
            />

            <Toggle
              checked={true}
              onChange={() => {}}
              label="Grande"
              size="lg"
            />
          </div>

          {/* Toggles desabilitados */}
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <h2 className="font-medium text-gray-700">Desabilitados</h2>

            <Toggle
              checked={true}
              onChange={() => {}}
              label="Ativo (desabilitado)"
              disabled
            />

            <Toggle
              checked={false}
              onChange={() => {}}
              label="Inativo (desabilitado)"
              disabled
            />
          </div>

          {/* Toggles sem labels */}
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <h2 className="font-medium text-gray-700">Sem Labels Visíveis</h2>

            <div className="flex gap-4">
              <Toggle
                checked={true}
                onChange={() => {}}
                aria-label="Toggle 1"
              />
              <Toggle
                checked={false}
                onChange={() => {}}
                aria-label="Toggle 2"
              />
              <Toggle
                checked={true}
                onChange={() => {}}
                disabled
                aria-label="Toggle 3 desabilitado"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-md mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Select Dropdown
          </h1>

          {/* Select básico */}
          <Select
            options={categories}
            value={selectedValue}
            onChange={(value) => setSelectedValue(value)}
            placeholder="Selecione uma categoria"
            label="Categoria"
          />

          {/* Select com ícones */}
          <Select
            options={users}
            value={multipleValues.user}
            onChange={(value) =>
              setMultipleValues({ ...multipleValues, user: value })
            }
            placeholder="Selecione um usuário"
            label="Usuário"
            variant="filled"
          />

          {/* Select searchable */}
          <Select
            options={users}
            value={multipleValues.user}
            onChange={(value) =>
              setMultipleValues({ ...multipleValues, user: value })
            }
            placeholder="Busque um usuário..."
            label="Buscar usuário"
            searchable
            clearable
            variant="outline"
            rounded="lg"
          />

          {/* Select com status */}
          <Select
            options={statusOptions}
            value={multipleValues.status}
            onChange={(value) =>
              setMultipleValues({ ...multipleValues, status: value })
            }
            placeholder="Selecione o status"
            label="Status"
            variant="flushed"
          />

          {/* Select com erro */}
          <Select
            options={categories}
            placeholder="Selecione uma opção"
            label="Campo obrigatório"
            error="Este campo é obrigatório"
            required
          />

          {/* Select desabilitado */}
          <Select
            options={categories}
            placeholder="Opção desabilitada"
            label="Desabilitado"
            disabled
            helperText="Este campo está desabilitado"
          />

          {/* Select customizado */}
          <Select
            options={categories}
            placeholder="Selecione..."
            label="Personalizado"
            className="custom-select"
            dropdownClassName="bg-gray-900 text-white"
            optionClassName="hover:bg-gray-800 text-white"
            variant="unstyled"
            size="lg"
          />
        </div>
      </div>
    </div>
  );
}
