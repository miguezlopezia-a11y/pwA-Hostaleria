import { MapPin, Star, BedDouble } from "lucide-react";
import { hostels } from "../data/hostels";

const PlaceholderImage = ({ label }) => (
  <div
    aria-hidden="true"
    className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-t-xl bg-slate-100"
  >
    <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_46%,#e2e8f0_47%,#e2e8f0_53%,transparent_54%)] bg-[length:14px_14px] opacity-60" />
    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm">
      <BedDouble className="h-5 w-5" />
    </div>
    <span className="sr-only">{label}</span>
  </div>
);

export const HostelCards = () => {
  return (
    <section
      id="hostels"
      data-testid="hostels-section"
      className="border-b border-slate-200 bg-slate-50"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
              Destacados
            </p>
            <h2
              data-testid="hostels-title"
              className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
            >
              Albergues destacados
            </h2>
          </div>
          <a
            href="#search"
            data-testid="hostels-see-all"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Ver todos los albergues →
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hostels.map((h) => (
            <article
              key={h.id}
              data-testid={`hostel-card-${h.id}`}
              className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow duration-150 hover:shadow-md"
            >
              <PlaceholderImage label={h.name} />

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {h.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-slate-700">
                    <Star className="h-4 w-4 fill-blue-600 text-blue-600" />
                    <span>{h.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>
                    {h.town} · {h.route} · {h.stage}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {h.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-500">Desde</p>
                    <p className="text-xl font-semibold text-slate-900">
                      {h.pricePerBed}€
                      <span className="ml-1 text-sm font-normal text-slate-500">
                        / cama
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    data-testid={`hostel-view-${h.id}`}
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-800 transition-colors duration-150 hover:border-blue-600 hover:text-blue-600"
                  >
                    Ver albergue
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
