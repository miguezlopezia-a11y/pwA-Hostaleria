import { useEffect, useState } from "react";
import { directoryService } from "../services/directory";

const todayIso = () => new Date().toISOString().slice(0, 10);

// Carga el directorio real (hostales + disponibilidad para `date` + reseñas)
// y lo fusiona por slug en el modelo que consumen las tarjetas:
// { id (=slug), name, address, pricePerBed, freeBeds, googleReviewUrl, bookingReviewUrl }
// `date` en formato YYYY-MM-DD; si no se pasa, hoy (decisión v2: camas libres
// para la fecha del buscador, o hoy si no hay fecha).
export const useDirectory = (date) => {
  const [hostales, setHostales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const day = date || todayIso();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      directoryService.listHostales(),
      directoryService.listAvailability(day),
      directoryService.listReviews(),
    ]).then(([h, a, r]) => {
      if (cancelled) return;
      if (h.error || a.error || r.error) {
        setHostales([]);
        setError("No se pudo cargar el directorio de albergues.");
      } else {
        const availability = new Map((a.data || []).map((x) => [x.slug, x.free_beds]));
        const reviews = new Map((r.data || []).map((x) => [x.slug, x]));
        setHostales(
          (h.data || []).map((x) => ({
            id: x.slug,
            name: x.name,
            address: x.address || "",
            pricePerBed: x.base_price,
            freeBeds: availability.get(x.slug) ?? null,
            googleReviewUrl: reviews.get(x.slug)?.google_review_url || "",
            bookingReviewUrl: reviews.get(x.slug)?.booking_review_url || "",
          })),
        );
        setError(null);
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [day]);

  return { hostales, loading, error, date: day };
};
