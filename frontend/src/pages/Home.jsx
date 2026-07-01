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
    if (payload.routeId) params.set("routeId", payload.routeId);
    if (payload.date) params.set("date", payload.date);
    navigate(`/buscar?${params.toString()}`);
  };

  const handleSelectRoute = (routeId) => {
    const params = new URLSearchParams();
    params.set("routeId", routeId);
    navigate(`/buscar?${params.toString()}`);
  };

  const handleViewHostel = (id) => navigate(`/albergue/${id}`);

  return (
    <>
      <Hero onSearch={handleSearch} />
      <RouteCards onSelectRoute={handleSelectRoute} />
      <HostelCards onViewHostel={handleViewHostel} />
      <CTASection />
    </>
  );
};
