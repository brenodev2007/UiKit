import { Hero } from "./components/templates/layout/HeroSection";
import heroImage from "./assets/react.svg";

function App() {
  const handlePrimaryClick = () => {
    alert("Você clicou no CTA principal!");
  };

  const handleSecondaryClick = () => {
    alert("Você clicou no CTA secundário!");
  };

  return (
    <div className="App">
      <Hero
        title="Impulsione seu negócio com automações inteligentes"
        subtitle="Transforme tarefas repetitivas em processos automáticos e aumente sua produtividade sem esforço."
        ctaText="Comece agora"
        onCtaClick={handlePrimaryClick}
        ctaSecondaryText="Saiba mais"
        onSecondaryClick={handleSecondaryClick}
        badgeText="Novo"
        image={
          <img src={heroImage} alt="Hero" className="rounded-xl shadow-lg" />
        }
        bgGradient="from-purple-600 to-pink-500"
        textColor="text-white"
      />
    </div>
  );
}

export default App;
