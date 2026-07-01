import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";

function App() {
  return (
    <div id="top" className="min-h-screen bg-white text-slate-900 antialiased">
      <Header />
      <main data-testid="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buscar" element={<div data-testid="buscar-page" />} />
          <Route path="/albergue/:id" element={<div data-testid="albergue-page" />} />
          <Route path="/favoritos" element={<div data-testid="favoritos-page" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
