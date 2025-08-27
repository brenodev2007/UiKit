import React, { useState } from "react";

export interface RecoveryFormData {
  email: string;
}

export interface RecoveryFormProps {
  onSubmit: (data: RecoveryFormData) => void;
  className?: string;
  title?: string;
  subtitle?: string;
  submitText?: string;
  loading?: boolean;
  successMessage?: string;
  onBackToLogin?: () => void;
}

export const RecoveryForm: React.FC<RecoveryFormProps> = ({
  onSubmit,
  className = "",
  title = "Recuperar senha",
  subtitle = "Digite seu email para receber instruções",
  submitText = "Enviar",
  loading = false,
  successMessage = "Email enviado! Verifique sua caixa de entrada.",
  onBackToLogin,
}) => {
  const [formData, setFormData] = useState<RecoveryFormData>({ email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setIsSubmitted(true);
  };

  return (
    <div className={`max-w-md w-full mx-auto ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {subtitle}
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  submitText
                )}
              </button>
            </form>

            {onBackToLogin && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Voltar para o login
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {successMessage}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {formData.email}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Reenviar email
            </button>

            {onBackToLogin && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Voltar para o login
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
