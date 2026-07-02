import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapPin, Star, BedDouble, ArrowLeft, Send, Check } from "lucide-react";
import { hostels } from "../data/hostels";
import { FavoriteButton } from "../components/FavoriteButton";

const PlaceholderImage = ({ label }) => (
  <div
    aria-hidden="true"
    className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-100 sm:h-72"
  >
    <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_46%,#e2e8f0_47%,#e2e8f0_53%,transparent_54%)] bg-[length:14px_14px] opacity-60" />
    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm">
      <BedDouble className="h-7 w-7" />
    </div>
    <span className="sr-only">{label}</span>
  </div>
);

export const AlbergueDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hostel = useMemo(() => hostels.find((h) => h.id === id), [id]);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  if (!hostel) {
    return (
      <section className="min-h-screen border-b border-slate-200 bg-slate-50 py-16">
        <Helmet>
          <title>Albergue no encontrado — Cama del Camino</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h1 className="text-2xl font-semibold text-slate-900">
            Albergue no encontrado
          </h1>
          <p className="mt-2 text-slate-600">
            El albergue que buscas no existe o ha sido eliminado.
          </p>
          <Link
            to="/buscar"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a resultados
          </Link>
        </div>
      </section>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      data-testid="albergue-page"
      className="min-h-screen border-b border-slate-200 bg-slate-50 py-8 sm:py-12"
    >
      <Helmet>
        <title>{hostel.name} — Cama del Camino</title>
        <meta name="description" content={`${hostel.name} en ${hostel.town}. ${hostel.route}, ${hostel.stage}. Precio desde ${hostel.pricePerBed}€ por cama.`} />
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <button
          type="button"
          onClick={() => navigate("/buscar")}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a resultados
        </button>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative">
              <PlaceholderImage label={hostel.name} />
              <FavoriteButton
                id={hostel.id}
                className="absolute right-3 top-3 shadow-sm"
              />
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                    {hostel.name}
                  </h1>
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>
                      {hostel.town} · {hostel.route} · {hostel.stage}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
                  <Star className="h-4 w-4 fill-blue-600 text-blue-600" />
                  {hostel.rating}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {hostel.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {hostel.description && (
                <p className="mt-6 text-base leading-relaxed text-slate-700">
                  {hostel.description}
                </p>
              )}

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-slate-500">Camas</p>
                  <p className="text-lg font-semibold text-slate-900">{hostel.beds}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Precio por cama</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {hostel.pricePerBed}€
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Etapa</p>
                  <p className="text-lg font-semibold text-slate-900">{hostel.stage}</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Contactar con el albergue
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Envía un mensaje. Sin reserva real: es solo una demo.
              </p>

              {sent ? (
                <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="h-4 w-4" />
                    Mensaje enviado
                  </div>
                  <p className="mt-1">El albergue responderá a {form.email} cuando la funcionalidad esté activa.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700">
                      Nombre
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700">
                      Mensaje
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                    Enviar mensaje
                  </button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
