import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export interface Testimonial {
  name: string;
  role?: string;
  avatar?: string;
  message: string;
}

export interface TestimonialsSectionProps {
  headline?: string;
  testimonials?: Testimonial[];
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export default function TestimonialsSection({
  headline = "O que nossos clientes dizem",
  testimonials = [
    {
      name: "João Silva",
      role: "CEO da Empresa X",
      avatar: "https://i.pravatar.cc/100?img=1",
      message:
        "Excelente serviço, superou nossas expectativas e entregou tudo no prazo!",
    },
    {
      name: "Maria Souza",
      role: "CTO da Startup Y",
      avatar: "https://i.pravatar.cc/100?img=2",
      message:
        "Profissionalismo e dedicação em cada detalhe do projeto. Recomendo!",
    },
    {
      name: "Carlos Lima",
      role: "Designer na Agência Z",
      avatar: "https://i.pravatar.cc/100?img=3",
      message:
        "Trabalho impecável, equipe muito competente e criativa. Resultado incrível!",
    },
  ],
  ctaText,
  onCtaClick,
  className = "",
}: TestimonialsSectionProps) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.6 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className={`py-24 bg-gray-50 ${className}`} ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-4xl md:text-5xl font-bold text-gray-900"
        >
          {headline}
        </motion.h2>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col items-center text-center"
            >
              {testimonial.avatar && (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-4 object-cover"
                />
              )}
              <p className="text-gray-700 mb-4">{testimonial.message}</p>
              <h4 className="font-semibold text-gray-900">
                {testimonial.name}
              </h4>
              {testimonial.role && (
                <span className="text-gray-500 text-sm">
                  {testimonial.role}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {ctaText && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.3 },
              },
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCtaClick}
            className="mt-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
          >
            {ctaText}
          </motion.button>
        )}
      </div>
    </section>
  );
}
