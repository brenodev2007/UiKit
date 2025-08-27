import React from "react";
import { motion } from "framer-motion";

export interface Plan {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
  ctaText?: string;
  onCtaClick?: () => void;
}

export interface PricingSectionProps {
  headline?: string;
  subheadline?: string;
  plans?: Plan[];
  className?: string;
}

export default function PricingSection({
  headline = "Nossos Planos",
  subheadline = "Escolha o plano que melhor se adapta ao seu negócio",
  plans = [
    {
      name: "Básico",
      price: "R$ 49/mês",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      ctaText: "Assinar Básico",
    },
    {
      name: "Profissional",
      price: "R$ 99/mês",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      popular: true,
      ctaText: "Assinar Profissional",
    },
    {
      name: "Premium",
      price: "R$ 199/mês",
      features: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4",
        "Feature 5",
      ],
      ctaText: "Assinar Premium",
    },
  ],
  className = "",
}: PricingSectionProps) {
  return (
    <section className={`py-24 bg-gray-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gray-900"
        >
          {headline}
        </motion.h2>
        {subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg md:text-xl"
          >
            {subheadline}
          </motion.p>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className={`bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition flex flex-col justify-between ${
                plan.popular ? "border-2 border-blue-600" : ""
              }`}
            >
              <div className="space-y-4 text-center">
                {plan.popular && (
                  <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Mais popular
                  </span>
                )}
                <h3 className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </h3>
                <p className="text-gray-700 text-xl font-semibold">
                  {plan.price}
                </p>
                <ul className="text-gray-600 mt-4 space-y-2 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {plan.ctaText && (
                <button
                  onClick={plan.onCtaClick}
                  className={`mt-6 w-full py-3 px-4 rounded-lg font-semibold shadow-md transition ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  }`}
                >
                  {plan.ctaText}
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
