import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { RouteCards } from "./components/RouteCards";
import { HostelCards } from "./components/HostelCards";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

function App() {
  const [lastSearch, setLastSearch] = useState(null);

  // Mock handlers: update local state only. No network calls, no setTimeout.
  const handleSearch = (payload) => {
    setLastSearch(payload);
  };

  const handleSelectRoute = (routeId) => {
    setLastSearch((prev) => ({ ...(prev || {}), routeId }));
    document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleJoin = () => {
    // Mock join: scroll to footer (real form would live on a separate page).
    document.getElementById("help")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="top" className="min-h-screen bg-white text-slate-900 antialiased">
      <Header />
      <main data-testid="main-content">
        <Hero onSearch={handleSearch} />
        <RouteCards onSelectRoute={handleSelectRoute} />
        <HostelCards />
        <CTASection onJoin={handleJoin} />
      </main>
      <Footer />

      {lastSearch && (
        <div
          data-testid="search-debug"
          className="sr-only"
          aria-hidden="true"
        >
          {JSON.stringify(lastSearch)}
        </div>
      )}
    </div>
  );
}

export default App;
