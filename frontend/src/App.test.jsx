import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "./test-utils";

// Mismo mock de la capa de datos que smoke.test.jsx (autorizado en v2, B-6).
vi.mock("./services/directory", () => ({
  directoryService: {
    listHostales: async () => ({
      data: [
        { name: "Albergue Test Norte", slug: "test-norte", address: "Calle Mayor 1, Pamplona", base_price: 15 },
        { name: "Casa Test Tui", slug: "test-tui", address: "Rúa Real 2, Tui", base_price: 12 },
        { name: "Albergue Test Costa", slug: "test-costa", address: "Paseo Mar 3, Llanes", base_price: 16 },
      ],
      error: null,
    }),
    listAvailability: async () => ({
      data: [
        { slug: "test-norte", free_beds: 3 },
        { slug: "test-tui", free_beds: 0 },
        { slug: "test-costa", free_beds: 5 },
      ],
      error: null,
    }),
    listReviews: async () => ({
      data: [
        { slug: "test-norte", google_review_url: "https://google.example/reviews/test-norte", booking_review_url: "" },
        { slug: "test-tui", google_review_url: "", booking_review_url: "" },
        { slug: "test-costa", google_review_url: "", booking_review_url: "https://booking.example/reviews/test-costa" },
      ],
      error: null,
    }),
  },
}));

beforeEach(() => {
  localStorage.clear();
});

test("flujo principal: buscar → ver ficha → marcar favorito → aparece en /favoritos", async () => {
  const user = userEvent.setup();
  renderApp("/buscar");

  // 1. Buscar: la lista muestra los albergues (carga asíncrona real)
  expect(screen.getByTestId("buscar-page")).toBeInTheDocument();
  await screen.findByTestId("hostel-card-test-norte");

  // 2. Ver ficha del albergue
  await user.click(screen.getByTestId("hostel-view-test-norte"));
  expect(
    await screen.findByRole("heading", { name: "Albergue Test Norte" }),
  ).toBeInTheDocument();
  expect(screen.getByTestId("albergue-page")).toBeInTheDocument();

  // 3. Marcar favorito (persiste en localStorage, sin red)
  await user.click(screen.getByTestId("favorite-test-norte"));
  expect(JSON.parse(localStorage.getItem("cama-favoritos"))).toContain("test-norte");

  // 4. Navegar a /favoritos desde el header: el albergue está ahí
  await user.click(screen.getByTestId("nav-favoritos"));
  expect(screen.getByTestId("favoritos-page")).toBeInTheDocument();
  await screen.findByTestId("hostel-card-test-norte");
  expect(
    screen.queryByText("Aún no tienes albergues guardados."),
  ).not.toBeInTheDocument();
});
