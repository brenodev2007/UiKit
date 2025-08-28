import { Avatar } from "./components/extras/Avatar";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-100">
      <Avatar name="Soriani" />
      <Avatar src="https://i.pravatar.cc/150?img=3" size="lg" />
      <Avatar name="Breno" size="sm" rounded="md" />
    </div>
  );
}

export default App;
