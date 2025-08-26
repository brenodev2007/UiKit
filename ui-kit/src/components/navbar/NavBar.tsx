import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <nav
      className={` w-full transition-all duration-300  ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-lg py-2"
          : "bg-white/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="font-bold text-2xl text-blue-600 transition-transform duration-300 hover:scale-105 mr-5">
          My<span className="text-blue-800">UI</span>
        </h1>

        <div className="hidden md:flex gap-8">
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group"
          >
            Sobre
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group"
          >
            Contato
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          <span
            className={`bg-blue-600 block absolute w-6 h-0.5 transition-all duration-300 ${
              open ? "rotate-45 translate-y-0" : "-translate-y-2"
            }`}
          ></span>
          <span
            className={`bg-blue-600 block absolute w-6 h-0.5 transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`bg-blue-600 block absolute w-6 h-0.5 transition-all duration-300 ${
              open ? "-rotate-45 translate-y-0" : "translate-y-2"
            }`}
          ></span>
        </button>

        <div
          className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-4 py-3 flex flex-col gap-4">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 border-b border-gray-100"
              onClick={handleLinkClick}
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 border-b border-gray-100"
              onClick={handleLinkClick}
            >
              Sobre
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2"
              onClick={handleLinkClick}
            >
              Contato
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
