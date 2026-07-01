import { useState } from "react";
import { Menu, X, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavoritos } from "../hooks/useFavoritos";

const navItems = [
  { label: "Buscar albergue", href: "/buscar" },
  { label: "Rutas", href: "/#routes" },
  { label: "Soy albergue", href: "/#cta-hostel" },
  { label: "Ayuda", href: "/#help" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { count } = useFavoritos();

  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          data-testid="logo-link"
          className="flex items-center gap-2 text-slate-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
            <MapPin className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="text-base font-semibold tracking-tight">
            Cama del Camino
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-slate-700 transition-colors duration-150 hover:text-blue-600"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/favoritos"
            data-testid="nav-favoritos"
            className="relative inline-flex items-center gap-1.5 text-sm text-slate-700 transition-colors duration-150 hover:text-blue-600"
          >
            <Heart className="h-4 w-4" />
            Favoritos
            {count > 0 && (
              <span
                data-testid="favorites-badge"
                className="absolute -right-3 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-medium text-white"
              >
                {count}
              </span>
            )}
          </Link>
        </nav>

        <div className="hidden md:block">
          <Link
            to="/buscar"
            data-testid="header-cta-search"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700"
          >
            Buscar
          </Link>
        </div>

        <button
          type="button"
          data-testid="mobile-menu-toggle"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-700 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="border-t border-slate-200 bg-white md:hidden"
        >
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-slate-700 hover:text-blue-600"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/favoritos"
              onClick={() => setOpen(false)}
              data-testid="mobile-nav-favoritos"
              className="flex items-center justify-between py-2 text-sm text-slate-700 hover:text-blue-600"
            >
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4" />
                Favoritos
              </span>
              {count > 0 && (
                <span
                  data-testid="mobile-favorites-badge"
                  className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-medium text-white"
                >
                  {count}
                </span>
              )}
            </Link>
            <Link
              to="/buscar"
              onClick={() => setOpen(false)}
              data-testid="mobile-cta-search"
              className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white"
            >
              Buscar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
