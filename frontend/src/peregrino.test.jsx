import { screen, waitFor } from "@testing-library/react";
import { renderApp } from "./test-utils";
import { SESSION_KEY } from "./pages/Peregrino";

// Mock del cliente Supabase: la RPC verify_peregrino_session se simula aquí.
let mockRpcResult = { data: { valid: false, error: "token inválido" }, error: null };
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
  mockRpcResult = { data: { valid: false, error: "token inválido" }, error: null };
});

test("token inválido → error claro, no crashea, no guarda sesión", async () => {
  renderApp("/peregrino?r=r-1&t=token-malo");

  await waitFor(() =>
    expect(screen.getByTestId("peregrino-error")).toBeInTheDocument(),
  );
  expect(screen.getByTestId("peregrino-error")).toHaveTextContent(
    "token inválido",
  );
  expect(localStorage.getItem(SESSION_KEY)).toBeNull();
});

test("token expirado → error claro, no guarda sesión", async () => {
  mockRpcResult = { data: { valid: false, error: "sesión expirada" }, error: null };
  renderApp("/peregrino?r=r-1&t=token-viejo");

  await waitFor(() =>
    expect(screen.getByTestId("peregrino-error")).toHaveTextContent(
      "sesión expirada",
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
