import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { hostels } from "../data/hostels";
import { routes } from "../data/routes";
import { SearchBar } from "../components/SearchBar";
import { HostelCard } from "../components/HostelCard";

export const Buscar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const location = searchParams.get("location") || "";
  const routeId = searchParams.get("routeId") || "";
  const date = searchParams.get("date") || "";

  const routeName = useMemo(
    () => routes.find((r) => r.id === routeId)?.name || "",
    [routeId],
  );

  const filtered = useMemo(() => {
    const term = location.trim().toLowerCase();
    return hostels.filter((h) => {
      const matchesLocation =
        !term ||
        h.town.toLowerCase().includes(term) ||
        h.stage.toLowerCase().includes(term) ||
        h.name.toLowerCase().includes(term);
      const matchesRoute = !routeId || h.route === routeName;
      return matchesLocation && matchesRoute;
    });
  }, [location, routeId, routeName]);

  const handleSearch = (payload) => {
    const params = new URLSearchParams();
    if (payload.location) params.set("location", payload.location);
    if (payload.routeId) params.set("routeId", payload.routeId);
    if (payload.date) params.set("date", payload.date);
    setSearchParams(params);
  };

  const handleView = (id) => navigate(`/albergue/${id}`);

  const headerText = location
    ? `${filtered.length} albergue${filtered.length === 1 ? "" : "s"} en ${location}`
    : routeName
      ? `${filtered.length} albergue${filtered.length === 1 ? "" : "s"} en ${routeName}`
      : `${filtered.length} albergue${filtered.length === 1 ? "" : "s"} encontrados`;

  return (
    <section
      id="search"
      data-testid="buscar-page"
      className="min-h-screen border-b border-slate-200 bg-slate-50"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Buscar albergues
        </h1>

        <div className="mt-6">
          <SearchBar
            onSearch={handleSearch}
            defaultLocation={location}
            defaultRouteId={routeId}
            defaultDate={date}
          />
        </div>

        <p className="mt-8 text-sm font-medium text-slate-600" data-testid="search-results-count">
          {headerText}
        </p>

        {filtered.length === 0 ? (
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
