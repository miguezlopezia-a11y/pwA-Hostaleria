import { MapPin } from "lucide-react";

const groups = [
  {
    title: "Producto",
    links: ["Buscar albergue", "Rutas", "Etapas", "Mapa"],
  },
  {
    title: "Albergues",
    links: ["Publicar albergue", "Tarifas", "Centro de ayuda"],
  },
  {
    title: "Empresa",
    links: ["Sobre nosotros", "Contacto", "Aviso legal", "Privacidad"],
  },
];

export const Footer = () => {
  return (
    <footer
      id="help"
      data-testid="site-footer"
      className="bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <a href="#top" className="flex items-center gap-2 text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
                <MapPin className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="text-sm font-semibold">Cama del Camino</span>
            </a>
            <p className="mt-3 text-sm text-slate-600">
              Directorio independiente de albergues del Camino de Santiago.
            </p>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {g.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-slate-700 transition-colors duration-150 hover:text-blue-600"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Cama del Camino. Prototipo estático.</p>
          <p>Hecho para peregrinos.</p>
        </div>
      </div>
    </footer>
  );
};
