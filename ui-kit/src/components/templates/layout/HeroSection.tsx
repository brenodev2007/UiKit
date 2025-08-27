import React from "react";
import { motion, type Variants } from "framer-motion";

export interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaSecondaryText?: string;
  onCtaClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
  image?: React.ReactNode;
  reverse?: boolean;
  badgeText?: string;
  bgGradient?: string; // ex: "from-purple-500 to-pink-500"
  textColor?: string; // ex: "text-white"
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const imageVariants: Variants = {
  hidden: (reverse: boolean) => ({ opacity: 0, x: reverse ? -50 : 50 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" },
  tap: { scale: 0.95 },
};

export function Hero({
  title = "Bem-vindo ao nosso produto",
  subtitle = "A solução perfeita para agilizar seus processos e aumentar sua produtividade.",
  ctaText = "Comece agora",
  ctaSecondaryText,
  onCtaClick,
  onSecondaryClick,
  className = "",
  image,
  reverse = false,
  badgeText,
  bgGradient = "from-blue-600 to-blue-500",
  textColor = "text-white",
}: HeroProps) {
  return (
    <section
      className={`w-full flex flex-col md:flex-row items-center justify-between py-20 px-6 md:px-16 bg-gradient-to-r ${bgGradient} ${textColor} ${className} ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <motion.div
        className="flex-1 mb-10 md:mb-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {badgeText && (
          <motion.div
            className="inline-block mb-4 px-3 py-1 bg-white text-blue-600 font-semibold rounded-full text-sm"
            variants={textVariants}
          >
            {badgeText}
          </motion.div>
        )}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
          variants={textVariants}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-6 opacity-90"
          variants={textVariants}
        >
          {subtitle}
        </motion.p>
        <div className="flex flex-wrap gap-4">
          {ctaText && onCtaClick && (
            <motion.button
              onClick={onCtaClick}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {ctaText}
            </motion.button>
          )}
          {ctaSecondaryText && onSecondaryClick && (
            <motion.button
              onClick={onSecondaryClick}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-transparent border border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              {ctaSecondaryText}
            </motion.button>
          )}
        </div>
      </motion.div>

      {image && (
        <motion.div
          className="flex-1"
          custom={reverse}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.02 }}
        >
          {image}
        </motion.div>
      )}
    </section>
  );
}
