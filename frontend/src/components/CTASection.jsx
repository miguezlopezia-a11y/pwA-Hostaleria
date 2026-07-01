import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { JoinModal } from "./JoinModal";

export const CTASection = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        id="cta-hostel"
        data-testid="cta-section"
        className="border-b border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 px-6 py-12 sm:px-10 sm:py-14">
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-medium uppercase tracking-wide text-blue-400">
                  Para albergues
                </p>
                <h2
                  data-testid="cta-title"
                  className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                >
                  ¿Tienes un albergue? Únete al directorio.
                </h2>
                <p className="mt-3 text-base text-slate-300">
                  Publica tu albergue gratis. Recibe peregrinos directamente, sin
                  intermediarios ni comisiones por reserva.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(true)}
                data-testid="cta-join-button"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700"
              >
                Publicar mi albergue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {open && <JoinModal onClose={() => setOpen(false)} />}
    </>
  );
};
