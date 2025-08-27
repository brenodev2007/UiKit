import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  headline?: string;
  subheadline?: string;
  faqs?: FAQItem[];
  className?: string;
  questionClassName?: string; // custom question text style
  answerClassName?: string; // custom answer text style
  bgColor?: string; // bg cor do bloco FAQ
  borderColor?: string; // cor da borda do bloco FAQ
  icon?: React.ReactNode; // ícone toggle personalizado
  iconRotate?: boolean; // rotaciona ícone ao abrir
  animationDuration?: number; // duração animação
  spacing?: string; // espaçamento entre FAQs
}

export default function FAQSection({
  headline = "Perguntas Frequentes",
  subheadline = "Respondemos as dúvidas mais comuns dos nossos clientes",
  faqs = [
    {
      question: "Como posso criar uma conta?",
      answer: "Clique no botão de cadastro e preencha os dados.",
    },
    {
      question: "Posso cancelar a assinatura?",
      answer: "Sim, cancele quando quiser sem penalidades.",
    },
    {
      question: "Métodos de pagamento aceitos?",
      answer: "Aceitamos cartões, débito e PayPal.",
    },
  ],
  className = "",
  questionClassName = "text-lg font-semibold text-gray-900",
  answerClassName = "text-gray-600 text-base",
  bgColor = "bg-white",
  borderColor = "border-gray-200",
  icon,
  iconRotate = true,
  animationDuration = 0.4,
  spacing = "space-y-4",
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  const defaultIcon = (
    <motion.span
      animate={{ rotate: openIndex !== null && iconRotate ? 45 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="text-gray-500 text-xl font-bold transform origin-center"
    >
      +
    </motion.span>
  );

  return (
    <section className={`py-24 ${className}`}>
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8">
        {headline && (
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            {headline}
          </motion.h2>
        )}
        {subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-gray-600 text-lg md:text-xl"
          >
            {subheadline}
          </motion.p>
        )}

        <div className={`mt-12 ${spacing} text-left`}>
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: animationDuration, delay: idx * 0.1 }}
              className={`${bgColor} ${borderColor} border rounded-xl overflow-hidden shadow-lg hover:shadow-xl`}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
              >
                <span className={questionClassName}>{faq.question}</span>
                {icon || defaultIcon}
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: animationDuration }}
                    className={`px-6 pb-4 ${answerClassName}`}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
