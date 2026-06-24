import { SearchBar } from "./SearchBar";

const stats = [
  { value: "240+", label: "albergues" },
  { value: "34", label: "etapas cubiertas" },
  { value: "0%", label: "comisión al huésped" },
  { value: "15k", label: "peregrinos / mes" },
];

export const Hero = ({ onSearch }) => {
  return (
    <section
      id="search"
      data-testid="hero-section"
      className="relative border-b border-slate-200 bg-slate-50"
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <span
            data-testid="hero-eyebrow"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Directorio independiente de albergues
          </span>

          <h1
            data-testid="hero-title"
            className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Reserva tu albergue en el{" "}
            <span className="text-blue-600">Camino de Santiago</span>
          </h1>

          <p
            data-testid="hero-subtitle"
            className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg"
          >
            Sin comisiones abusivas. Directamente con el albergue.
          </p>

          <div className="mt-8">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>

        <dl
          data-testid="hero-stats"
          className="mt-12 grid grid-cols-2 gap-6 border-t border-slate-200 pt-8 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} data-testid={`stat-${s.label.replace(/\s+/g, "-")}`}>
              <dt className="text-xs uppercase tracking-wide text-slate-500">
                {s.label}
              </dt>
              <dd className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
