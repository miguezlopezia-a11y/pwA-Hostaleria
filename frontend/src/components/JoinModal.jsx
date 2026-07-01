import { useState } from "react";
import { X, Check } from "lucide-react";

const STORAGE_KEY = "cama-publicar-email";

export const JoinModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!list.includes(email)) {
      list.push(email);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    setSaved(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-modal-title"
    >
      <div
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="join-modal-title"
              className="text-lg font-semibold text-slate-900"
            >
              Publicar mi albergue
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Déjanos tu email y te avisamos cuando esté disponible.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {saved ? (
          <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <div className="flex items-center gap-2 font-medium">
              <Check className="h-4 w-4" />
              Te hemos apuntado
            </div>
            <p className="mt-1">Avisaremos a {email} cuando puedas publicar tu albergue.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="join-email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="join-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Avísame cuando esté disponible
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
