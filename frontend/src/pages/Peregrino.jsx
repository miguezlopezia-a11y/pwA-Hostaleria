import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

// Sesión de peregrino (NO es auth real): contexto de qué reserva/hostal está
// usando la PWA. La valida la RPC verify_peregrino_session (migración 007);
// el QR lo genera bunker-hosteleria al completar el check-in.
// Estructura en localStorage["cama-peregrino-session"]:
//   { reservation_id, hostal_id, hostal_name, guest_name,
//     checkin_date, checkout_date, verified_at }
export const SESSION_KEY = "cama-peregrino-session";

export const readPeregrinoSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
};

export const Peregrino = () => {
  const [searchParams] = useSearchParams();
  const [estado, setEstado] = useState("verificando"); // verificando | ok | error | sin-sesion
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");

  const r = searchParams.get("r");
  const t = searchParams.get("t");

  useEffect(() => {
    if (!r || !t) {
      const existing = readPeregrinoSession();
      if (existing) {
        setSession(existing);
        setEstado("ok");
      } else {
        setEstado("sin-sesion");
      }
      return;
    }
    let cancelled = false;
    (async () => {
      const { data, error: rpcError } = await supabase.rpc(
        "verify_peregrino_session",
        { p_reservation_id: r, p_token: t },
      );
      if (cancelled) return;
      if (rpcError || !data?.valid) {
        setError(data?.error || "No se pudo verificar el enlace.");
        setEstado("error");
        return;
      }
      const sesion = {
        reservation_id: r,
        hostal_id: data.hostal_id,
        hostal_name: data.hostal_name,
        guest_name: data.guest_name,
        checkin_date: data.checkin_date,
        checkout_date: data.checkout_date,
        verified_at: new Date().toISOString(),
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sesion));
      setSession(sesion);
      setEstado("ok");
    })();
    return () => {
      cancelled = true;
    };
  }, [r, t]);

  return (
    <section
      data-testid="peregrino-page"
      className="min-h-screen border-b border-slate-200 bg-slate-50 py-10 sm:py-14"
    >
      <Helmet>
        <title>Mi estancia — Cama del Camino</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="mx-auto max-w-xl px-4 sm:px-6">
        {estado === "verificando" && (
          <p className="text-sm text-slate-500">Verificando tu enlace...</p>
        )}

        {estado === "ok" && session && (
          <div
            className="rounded-xl border border-slate-200 bg-white p-6"
            data-testid="peregrino-ok"
          >
            <h1 className="text-2xl font-semibold text-slate-900">
              Sesión iniciada para tu estancia en {session.hostal_name}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {session.guest_name} · entrada {session.checkin_date} · salida{" "}
              {session.checkout_date}
            </p>
          </div>
        )}

        {estado === "error" && (
          <div
            className="rounded-xl border border-red-200 bg-red-50 p-6"
            data-testid="peregrino-error"
          >
            <h1 className="text-xl font-semibold text-red-800">
              Enlace no válido
            </h1>
            <p className="mt-2 text-sm text-red-700">{error}</p>
            <p className="mt-2 text-sm text-slate-600">
              Pide al albergue que te muestre de nuevo el QR de check-in.
            </p>
          </div>
        )}

        {estado === "sin-sesion" && (
          <div
            className="rounded-xl border border-slate-200 bg-white p-6"
            data-testid="peregrino-sin-sesion"
          >
            <h1 className="text-xl font-semibold text-slate-900">
              Sin sesión de peregrino
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Escanea el QR que te enseña el albergue al hacer el check-in.
            </p>
            <Link
              to="/"
              className="mt-4 inline-flex rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Volver al inicio
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
