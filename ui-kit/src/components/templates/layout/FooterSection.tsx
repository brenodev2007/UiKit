import React from "react";
import { motion } from "framer-motion";

export interface FooterProps {
  headline?: string;
  description?: string;
  links?: { label: string; href: string }[];
  socialLinks?: { label: string; href: string; icon: React.ReactNode }[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export default function Footer({
  headline = "Vamos nos conectar",
  description = "Fique por dentro das novidades e acompanhe nossos conteúdos.",
  links = [
    { label: "Home", href: "#" },
    { label: "Sobre", href: "#" },
    { label: "Serviços", href: "#" },
    { label: "Contato", href: "#" },
  ],
  socialLinks = [],
  ctaLabel,
  ctaHref,
  className = "",
}: FooterProps) {
  return (
    <footer className={`bg-gray-900 text-white py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h3 className="text-3xl font-bold mb-2">{headline}</h3>
          <p className="text-gray-400 mb-4">{description}</p>
          {ctaLabel && ctaHref && (
            <a
              href={ctaHref}
              className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {ctaLabel}
            </a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row gap-8 flex-1"
        >
          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Links úteis</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-3">Redes sociais</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="hover:text-blue-500 transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Sua Empresa. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
