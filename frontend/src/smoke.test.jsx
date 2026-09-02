import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "./test-utils";

// Mock de la capa de datos (autorizado en v2, hallazgo B-6 del némesis):
// los tests no dependen del antiguo mock data/hostels.js ni de red.
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

describe("smoke: las páginas renderizan sin crashear", () => {
  test("Home renderiza sus secciones clave", () => {
    renderApp("/");
    expect(screen.getByTestId("main-content")).toBeInTheDocument();
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("routes-section")).toBeInTheDocument();
    expect(screen.getByTestId("hostels-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
  });

  test("Buscar renderiza con todos los albergues", async () => {
    renderApp("/buscar");
    expect(screen.getByTestId("buscar-page")).toBeInTheDocument();
    expect(screen.getByTestId("search-form")).toBeInTheDocument();
    await screen.findByTestId("hostel-card-test-norte");
    expect(screen.getByTestId("search-results-count")).toHaveTextContent(
      "3 albergues encontrados",
    );
  });

  test("Buscar — el filtro por localidad filtra de verdad", async () => {
    const user = userEvent.setup();
    renderApp("/buscar");
    await screen.findByTestId("hostel-card-test-tui");

    await user.type(screen.getByTestId("search-location"), "Tui");
    await user.click(screen.getByTestId("search-submit"));

    expect(screen.getByTestId("search-results-count")).toHaveTextContent(
      "1 albergue en Tui",
    );
    expect(screen.getByTestId("hostel-card-test-tui")).toBeInTheDocument();
    expect(screen.queryByTestId("hostel-card-test-norte")).not.toBeInTheDocument();
    expect(screen.queryByTestId("hostel-card-test-costa")).not.toBeInTheDocument();
  });

  test("Buscar — disponibilidad real por tarjeta", async () => {
    renderApp("/buscar");
    await screen.findByTestId("hostel-card-test-norte");
    expect(screen.getByTestId("hostel-availability-test-norte")).toHaveTextContent(
      "3 camas libres",
    );
    expect(screen.getByTestId("hostel-availability-test-tui")).toHaveTextContent(
      "Sin disponibilidad",
    );
  });

  test("Buscar — badges de reseñas solo si la URL existe", async () => {
    renderApp("/buscar");
    await screen.findByTestId("hostel-card-test-norte");
    // test-norte tiene google_review_url; test-tui no tiene ninguna;
    // test-costa solo booking_review_url.
    expect(screen.getByTestId("hostel-test-norte-review-google")).toBeInTheDocument();
    expect(screen.queryByTestId("hostel-test-norte-review-booking")).not.toBeInTheDocument();
    expect(screen.queryByTestId("hostel-test-tui-review-google")).not.toBeInTheDocument();
    expect(screen.queryByTestId("hostel-test-tui-review-booking")).not.toBeInTheDocument();
    expect(screen.getByTestId("hostel-test-costa-review-booking")).toBeInTheDocument();
    expect(screen.queryByTestId("hostel-test-costa-review-google")).not.toBeInTheDocument();
  });

  test("AlbergueDetalle renderiza la ficha del albergue", async () => {
    renderApp("/albergue/test-norte");
    expect(
      await screen.findByRole("heading", { name: "Albergue Test Norte" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("albergue-page")).toBeInTheDocument();
    expect(screen.getByTestId("favorite-test-norte")).toBeInTheDocument();
    expect(screen.getByTestId("albergue-availability")).toHaveTextContent(
      "3 camas libres",
    );
    expect(screen.getByTestId("albergue-test-norte-review-google")).toBeInTheDocument();
  });

  test("AlbergueDetalle — id inexistente muestra aviso", async () => {
    renderApp("/albergue/no-existe");
    expect(await screen.findByText("Albergue no encontrado")).toBeInTheDocument();
  });

  test("Favoritos — vacío muestra el estado vacío", async () => {
    renderApp("/favoritos");
    expect(screen.getByTestId("favoritos-page")).toBeInTheDocument();
    expect(
      await screen.findByText("Aún no tienes albergues guardados."),
    ).toBeInTheDocument();
  });

  test("NotFound — ruta desconocida muestra la página 404", () => {
    renderApp("/ruta-que-no-existe");
    expect(screen.getByText("Página no encontrada")).toBeInTheDocument();
  });
});
