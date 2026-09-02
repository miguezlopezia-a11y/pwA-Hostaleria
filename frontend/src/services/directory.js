import { supabase } from "../lib/supabase";

// Capa de datos del directorio público: RPCs security definer del proyecto
// Supabase compartido con bunker-hosteleria (migrations/006, 008 y 009).
// No exponen más que campos públicos; la anon key es pública por diseño.
export const directoryService = {
  // -> [{ name, slug, address, base_price }]
  listHostales: () => supabase.rpc("list_public_hostales"),

  // -> [{ slug, free_beds }] para la fecha dada (YYYY-MM-DD)
  listAvailability: (date) =>
    supabase.rpc("list_public_availability", { p_date: date }),

  // -> [{ slug, google_review_url, booking_review_url }]
  listReviews: () => supabase.rpc("list_public_hostal_reviews"),
};
