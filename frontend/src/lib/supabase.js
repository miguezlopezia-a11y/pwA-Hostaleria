import { createClient } from "@supabase/supabase-js";

// Anon key pública por diseño (la protección la dan los grants de la RPC y
// RLS) — mismo patrón que bunker-hosteleria. En el deploy de Cloudflare hay
// que configurar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// No lanzar error: sin env vars el resto de la PWA debe seguir funcionando
// (el despliegue en Cloudflare aún puede no tenerlas configuradas). Solo
// /peregrino degrada: la RPC fallará y la página mostrará error claro.
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY — /peregrino no podrá verificar sesiones",
  );
}

export const supabase = createClient(
  supabaseUrl || "http://localhost",
  supabaseAnonKey || "dummy",
);
