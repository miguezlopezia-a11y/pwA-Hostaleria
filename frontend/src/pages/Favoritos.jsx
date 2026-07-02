import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { hostels } from "../data/hostels";
import { useFavoritos } from "../hooks/useFavoritos";
import { HostelCard } from "../components/HostelCard";

export const Favoritos = () => {
  const { ids } = useFavoritos();
  const navigate = useNavigate();
  const favorites = useMemo(
    () => hostels.filter((h) => ids.includes(h.id)),
    [ids],
  );

  return (
    <section
      data-testid="favoritos-page"
      className="min-h-screen border-b border-slate-200 bg-slate-50 py-10 sm:py-14"
    >
      <Helmet>
        <title>Mis favoritos — Cama del Camino</title>
        <meta
          name="description"
          content="Tus albergues guardados del Camino de Santiago."
        />
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Mis favoritos
        </h1>

        {favorites.length === 0 ? (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-10 text-center">
            <div className="mx-flex mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Heart className="h-6 w-6" />
            </div>
            <p className="text-slate-700">
              Aún no tienes albergues guardados.
            </p>
            <Link
              to="/buscar"
              className="mt-4 inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Explorar el directorio
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((h) => (
              <HostelCard
                key={h.id}
                hostel={h}
                onView={() => navigate(`/albergue/${h.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
