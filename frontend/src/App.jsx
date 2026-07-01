import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Buscar } from "./pages/Buscar";
import { AlbergueDetalle } from "./pages/AlbergueDetalle";
import { Favoritos } from "./pages/Favoritos";

function App() {
  return (
    <div id="top" className="min-h-screen bg-white text-slate-900 antialiased">
      <Header />
      <main data-testid="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buscar" element={<Buscar />} />
          <Route path="/albergue/:id" element={<AlbergueDetalle />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
