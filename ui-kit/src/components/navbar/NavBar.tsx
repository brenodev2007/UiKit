import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center gap-3">
      <h1 className="font-bold text-xl text-blue-600">MyUI</h1>

      <div className="hidden md:flex gap-6">
        <a href="#" className="text-gray-700 hover:text-blue-600">
          Home
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600">
          Sobre
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600">
          Contato
        </a>
      </div>

      <button className="md:hidden" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {open && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 flex flex-col gap-3 md:hidden">
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Sobre
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600">
            Contato
          </a>
        </div>
      )}
    </nav>
  );
}
