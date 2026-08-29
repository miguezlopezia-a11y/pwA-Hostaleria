import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "./test-utils";

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

  test("Buscar renderiza con todos los albergues", () => {
    renderApp("/buscar");
    expect(screen.getByTestId("buscar-page")).toBeInTheDocument();
    expect(screen.getByTestId("search-form")).toBeInTheDocument();
    expect(screen.getByTestId("search-results-count")).toHaveTextContent(
      "3 albergues encontrados",
    );
  });

  test("Buscar — el filtro por localidad filtra de verdad", async () => {
    const user = userEvent.setup();
    renderApp("/buscar");

    await user.type(screen.getByTestId("search-location"), "Tui");
    await user.click(screen.getByTestId("search-submit"));

    expect(screen.getByTestId("search-results-count")).toHaveTextContent(
      "1 albergue en Tui",
    );
    expect(screen.getByTestId("hostel-card-h-002")).toBeInTheDocument();
    expect(screen.queryByTestId("hostel-card-h-001")).not.toBeInTheDocument();
    expect(screen.queryByTestId("hostel-card-h-003")).not.toBeInTheDocument();
  });

  test("AlbergueDetalle renderiza la ficha del albergue", () => {
    renderApp("/albergue/h-001");
    expect(screen.getByTestId("albergue-page")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Albergue San Nicolás" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("favorite-h-001")).toBeInTheDocument();
  });

  test("AlbergueDetalle — id inexistente muestra aviso", () => {
    renderApp("/albergue/no-existe");
    expect(screen.getByText("Albergue no encontrado")).toBeInTheDocument();
  });

  test("Favoritos — vacío muestra el estado vacío", () => {
    renderApp("/favoritos");
    expect(screen.getByTestId("favoritos-page")).toBeInTheDocument();
    expect(
      screen.getByText("Aún no tienes albergues guardados."),
    ).toBeInTheDocument();
  });

  test("NotFound — ruta desconocida muestra la página 404", () => {
    renderApp("/ruta-que-no-existe");
    expect(screen.getByText("Página no encontrada")).toBeInTheDocument();
  });
});
