import { useState } from "react";
import Toggle from "./components/input/Toggle";

export default function App() {
  const [toggleValue, setToggleValue] = useState(false);

  return (
    <div className="p-8 space-y-8 max-w-md mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">Componentes Teste</h1>

      {/* Toggle */}
      <div className="space-y-2">
        <h2 className="font-semibold">Toggle</h2>
        <Toggle
          checked={toggleValue}
          onChange={setToggleValue}
          label="Ativar recurso"
          labelPosition="right"
          withIcons
          onIcon="✓"
          offIcon="✕"
          variant="primary"
          size="md"
        />
        <p>Estado: {toggleValue ? "Ativado" : "Desativado"}</p>
      </div>
    </div>
  );
}
