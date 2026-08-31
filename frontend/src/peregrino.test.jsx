import { screen, waitFor } from "@testing-library/react";
import { renderApp } from "./test-utils";
import { SESSION_KEY } from "./pages/Peregrino";

// Mock del cliente Supabase: la RPC verify_peregrino_session se simula aquí.
// La RPC devuelve un único mensaje genérico "sesión inválida" para cualquier
// fallo (reserva inexistente, token incorrecto o caducada) — anti-enumeración.
let mockRpcResult = { data: { valid: false, error: "sesión inválida" }, error: null };
vi.mock("./lib/supabase", () => ({
  supabase: { rpc: async () => mockRpcResult },
}));

const SESION_VALIDA = {
  valid: true,
  hostal_id: "h-1",
  hostal_name: "Albergue Demo Norte",
  guest_name: "Peregrino Demo",
  checkin_date: "2026-08-30",
  checkout_date: "2026-09-02",
};

beforeEach(() => {
  localStorage.clear();
  mockRpcResult = { data: { valid: false, error: "sesión inválida" }, error: null };
});

test("token inválido → error genérico, no crashea, no guarda sesión", async () => {
  renderApp("/peregrino?r=r-1&t=token-malo");

  await waitFor(() =>
    expect(screen.getByTestId("peregrino-error")).toBeInTheDocument(),
  );
  expect(screen.getByTestId("peregrino-error")).toHaveTextContent(
    "sesión inválida",
  );
  expect(localStorage.getItem(SESSION_KEY)).toBeNull();
});

test("token expirado → mismo error genérico (anti-enumeración), no guarda sesión", async () => {
  // La RPC no distingue expirado de inválido: mismo mensaje en ambos casos.
  mockRpcResult = { data: { valid: false, error: "sesión inválida" }, error: null };
  renderApp("/peregrino?r=r-1&t=token-viejo");

  await waitFor(() =>
    expect(screen.getByTestId("peregrino-error")).toHaveTextContent(
      "sesión inválida",
    ),
  );
  expect(localStorage.getItem(SESSION_KEY)).toBeNull();
});

test("token válido → sesión guardada en localStorage y confirmación en pantalla", async () => {
  mockRpcResult = { data: SESION_VALIDA, error: null };
  renderApp("/peregrino?r=r-1&t=token-bueno");

  await waitFor(() =>
    expect(screen.getByTestId("peregrino-ok")).toHaveTextContent(
      "Sesión iniciada para tu estancia en Albergue Demo Norte",
    ),
  );

  const guardada = JSON.parse(localStorage.getItem(SESSION_KEY));
  expect(guardada).toMatchObject({
    reservation_id: "r-1",
    hostal_id: "h-1",
    hostal_name: "Albergue Demo Norte",
    guest_name: "Peregrino Demo",
    checkin_date: "2026-08-30",
    checkout_date: "2026-09-02",
  });
  expect(guardada.verified_at).toBeTruthy();
});

test("sin parámetros pero con sesión guardada → la muestra (persiste tras recargar)", async () => {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      reservation_id: "r-1",
      hostal_id: "h-1",
      hostal_name: "Albergue Demo Norte",
      guest_name: "Peregrino Demo",
      checkin_date: "2026-08-30",
      checkout_date: "2026-09-02",
      verified_at: "2026-08-30T10:00:00.000Z",
    }),
  );
  renderApp("/peregrino");

  await waitFor(() =>
    expect(screen.getByTestId("peregrino-ok")).toHaveTextContent(
      "Albergue Demo Norte",
    ),
  );
});

test("sin parámetros y sin sesión → mensaje guiando al QR", () => {
  renderApp("/peregrino");
  expect(screen.getByTestId("peregrino-sin-sesion")).toBeInTheDocument();
});
