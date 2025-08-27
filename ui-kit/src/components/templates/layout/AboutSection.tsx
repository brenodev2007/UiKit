import React from "react";
import { motion } from "framer-motion";

export interface AboutSectionAdvancedProps {
  headline?: string;
  text?: string;
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean;
  values?: { icon?: React.ReactNode; title: string; description: string }[];
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export default function AboutSection({
  headline = "Sobre nós",
  text = "Somos uma equipe dedicada a criar soluções digitais de alta qualidade. Transformamos ideias em produtos reais e impactantes.",
  imageSrc = "https://via.placeholder.com/500x400",
  imageAlt = "Imagem sobre nós",
  reverse = false,
  values = [
    { title: "Qualidade", description: "Entrega sempre com padrão elevado" },
    { title: "Inovação", description: "Soluções modernas e criativas" },
    { title: "Suporte", description: "Atendimento rápido e eficiente" },
  ],
  ctaText = "Saiba mais",
  onCtaClick,
  className = "",
}: AboutSectionAdvancedProps) {
  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div
        className={`max-w-6xl mx-auto px-6 md:px-12 flex flex-col ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } items-center gap-10`}
      >
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h2 className="text-3xl font-bold mb-4">{headline}</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">{text}</p>

          {/* Valores/Benefícios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                {item.icon ? (
                  <span className="text-blue-600">{item.icon}</span>
                ) : (
                  <span className="text-blue-600 font-bold text-xl">✓</span>
                )}
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          {ctaText && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCtaClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
            >
              {ctaText}
            </motion.button>
          )}
        </motion.div>

        {/* Imagem */}
        {imageSrc && (
          <motion.div
            initial={{ opacity: 0, x: reverse ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="rounded-xl shadow-xl w-full object-cover"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
