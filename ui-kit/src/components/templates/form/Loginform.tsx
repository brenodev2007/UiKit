import React, { useState } from "react";

// Tipagem dos dados do login
export interface LoginFormData {
  email: string;
  password: string;
}

// Props do formulário
export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  className?: string;
  title?: string;
  subtitle?: string;
  submitText?: string;
  loading?: boolean;
  socialLogin?: boolean;
  showDivider?: boolean;
  onRegister?: () => void;
}

// Reutilizando os componentes Input e Checkbox do RegisterForm
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

export function LoginForm({
  onSubmit,
  className = "",
  title = "Bem-vindo de volta",
  subtitle = "Entre com sua conta",
  submitText = "Entrar",
  loading = false,
  socialLogin = true,
  showDivider = true,
  onRegister,
}: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<LoginFormData> = {};
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email inválido";
    if (!formData.password) newErrors.password = "Senha é obrigatória";

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
            placeholder="Digite sua senha"
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
                      Ou entre com
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
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
            Não tem uma conta?{" "}
            <button
              type="button"
              onClick={onRegister}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
