import { hostels } from "../data/hostels";
import { HostelCard } from "./HostelCard";

export const HostelCards = ({ onViewHostel }) => {
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
            href="/buscar"
            data-testid="hostels-see-all"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Ver todos los albergues →
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hostels.map((h) => (
            <HostelCard key={h.id} hostel={h} onView={() => onViewHostel?.(h.id)} />
          ))}
        </div>
      </div>
    </section>
  );
};
