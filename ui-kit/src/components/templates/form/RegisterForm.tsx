import React, { useState } from "react";

// Tipagem dos dados do formulário
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms?: boolean;
}

// Props do formulário
export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  className?: string;
  title?: string;
  subtitle?: string;
  submitText?: string;
  loading?: boolean;
  socialLogin?: boolean;
  showDivider?: boolean;
  onLogin?: () => void;
}

// Componente de Input genérico
const Input = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

// Componente de Checkbox genérico
const Checkbox = ({
  id,
  label,
  checked,
  onChange,
  error,
}: {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => (
  <div className="flex items-center">
    <input
      id={id}
      name={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`h-4 w-4 ${
        error ? "text-red-600" : "text-blue-600"
      } focus:ring-blue-500 border-gray-300 rounded`}
    />
    <label
      htmlFor={id}
      className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
    >
      {label}
    </label>
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
  </div>
);

// Formulário de cadastro
export function RegisterForm({
  onSubmit,
  className = "",
  title = "Crie sua conta",
  subtitle = "Preencha os dados para se cadastrar",
  submitText = "Cadastrar",
  loading = false,
  socialLogin = true,
  showDivider = true,
  onLogin,
}: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Validação
  const validateForm = () => {
    const newErrors: Partial<RegisterFormData> = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email inválido";
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    else if (formData.password.length < 6)
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Senhas não coincidem";
    if (!formData.agreeToTerms)
      alert("Você deve concordar com os termos e condições");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  return (
    <div className={`max-w-md w-full mx-auto ${className}`}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            label="Nome completo"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Seu nome completo"
          />
          <Input
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="seu@email.com"
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Mínimo 6 caracteres"
          />
          <Input
            id="confirmPassword"
            label="Confirmar senha"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            placeholder="Digite sua senha novamente"
          />

          <Checkbox
            id="agreeToTerms"
            checked={!!formData.agreeToTerms}
            onChange={handleChange}
            label={
              <>
                Concordo com os{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  termos e condições
                </a>
              </>
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50 mt-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              submitText
            )}
          </button>
        </form>

        {socialLogin && (
          <>
            {showDivider && (
              <div className="mt-6 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300">
                      Ou cadastre-se com
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              {/* Botões sociais podem ser componentizados futuramente */}
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Google
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Facebook
              </button>
            </div>
          </>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Já tem uma conta?{" "}
            <button
              type="button"
              onClick={onLogin}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Entrar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
