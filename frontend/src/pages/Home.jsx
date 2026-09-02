import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Hero } from "../components/Hero";
import { RouteCards } from "../components/RouteCards";
import { HostelCards } from "../components/HostelCards";
import { CTASection } from "../components/CTASection";

export const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (payload) => {
    const params = new URLSearchParams();
    if (payload.location) params.set("location", payload.location);
    if (payload.date) params.set("date", payload.date);
    navigate(`/buscar?${params.toString()}`);
  };

  // Las rutas del Camino son contenido informativo: los hostales reales no
  // tienen columna de ruta, así que la tarjeta lleva al directorio completo
  // (no se filtra por ruta — no hay dato que lo respalde).
  const handleSelectRoute = () => navigate("/buscar");

  const handleViewHostel = (id) => navigate(`/albergue/${id}`);

  return (
    <>
      <Helmet>
        <title>Cama del Camino — Albergues del Camino de Santiago</title>
        <meta
          name="description"
          content="Directorio independiente de albergues del Camino de Santiago. Sin comisiones, directamente con el albergue."
        />
        <meta property="og:title" content="Cama del Camino — Albergues del Camino de Santiago" />
        <meta
          property="og:description"
          content="Directorio independiente de albergues del Camino de Santiago. Sin comisiones."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Hero onSearch={handleSearch} />
      <RouteCards onSelectRoute={handleSelectRoute} />
      <HostelCards onViewHostel={handleViewHostel} />
      <CTASection />
    </>
  );
};
