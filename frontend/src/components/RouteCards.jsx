import { ArrowUpRight, Footprints } from "lucide-react";
import { routes } from "../data/routes";

export const RouteCards = ({ onSelectRoute }) => {
  return (
    <section
      id="routes"
      data-testid="routes-section"
      className="border-b border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
              Rutas
            </p>
            <h2
              data-testid="routes-title"
              className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
            >
              Elige tu Camino
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-600">
            Cuatro rutas oficiales. Cada una con su propio carácter, distancia y
            paisajes.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {routes.map((r) => (
            <button
              type="button"
              key={r.id}
              data-testid={`route-card-${r.id}`}
              onClick={() => onSelectRoute?.(r.id)}
              className="group flex flex-col items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 text-left transition-colors duration-150 hover:border-blue-600"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-slate-700 transition-colors duration-150 group-hover:bg-blue-600 group-hover:text-white">
                <Footprints className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {r.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{r.description}</p>
              </div>

              <div className="mt-auto flex w-full items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                <span>{r.distanceKm} km · {r.stages} etapas</span>
                <ArrowUpRight className="h-4 w-4 text-slate-400 transition-colors duration-150 group-hover:text-blue-600" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
