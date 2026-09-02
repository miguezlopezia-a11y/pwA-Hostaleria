import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDirectory } from "../hooks/useDirectory";
import { SearchBar } from "../components/SearchBar";
import { HostelCard } from "../components/HostelCard";

export const Buscar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const location = searchParams.get("location") || "";
  const date = searchParams.get("date") || "";

  // Datos reales: hostales + disponibilidad para la fecha del buscador
  // (o hoy si no hay fecha) + reseñas. La lógica de ocupación vive en la RPC.
  const { hostales, loading, error, date: availabilityDate } = useDirectory(date);

  const filtered = useMemo(() => {
    const term = location.trim().toLowerCase();
    return hostales.filter((h) => {
      return (
        !term ||
        h.name.toLowerCase().includes(term) ||
        h.address.toLowerCase().includes(term)
      );
    });
  }, [hostales, location]);

  const handleSearch = (payload) => {
    const params = new URLSearchParams();
    if (payload.location) params.set("location", payload.location);
    if (payload.date) params.set("date", payload.date);
    setSearchParams(params);
  };

  const handleView = (id) => navigate(`/albergue/${id}`);

  const headerText = location
    ? `${filtered.length} albergue${filtered.length === 1 ? "" : "s"} en ${location}`
    : `${filtered.length} albergue${filtered.length === 1 ? "" : "s"} encontrados`;

  return (
    <section
      id="search"
      data-testid="buscar-page"
      className="min-h-screen border-b border-slate-200 bg-slate-50"
    >
      <Helmet>
        <title>Buscar albergues — Cama del Camino</title>
        <meta
          name="description"
          content="Busca albergues del Camino de Santiago por localidad y fecha."
        />
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Buscar albergues
        </h1>

        <div className="mt-6">
          <SearchBar
            onSearch={handleSearch}
            defaultLocation={location}
            defaultDate={date}
          />
        </div>

        <p className="mt-8 text-sm font-medium text-slate-600" data-testid="search-results-count">
          {headerText}
        </p>
        <p className="mt-1 text-xs text-slate-500" data-testid="availability-date">
          Disponibilidad para el {availabilityDate}
        </p>

        {loading ? (
          <p className="mt-8 text-center text-slate-500" data-testid="buscar-loading">
            Cargando albergues...
          </p>
        ) : error ? (
          <p className="mt-8 text-center text-red-600" data-testid="buscar-error">
            {error}
          </p>
        ) : filtered.length === 0 ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-700">
              No encontramos albergues para tu búsqueda.
            </p>
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Ver todos
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((h) => (
              <HostelCard key={h.id} hostel={h} onView={() => handleView(h.id)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
