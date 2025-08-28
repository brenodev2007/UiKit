import Loader from "./components/extras/Loader";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-100">
      <Loader size="sm" color="#ef4444" variant="spinner" />
      <Loader size="md" color="#3b82f6" variant="dots" />
      <Loader size="lg" color="#10b981" variant="pulse" />
    </div>
  );
}

export default App;
