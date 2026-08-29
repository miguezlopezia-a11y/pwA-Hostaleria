import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "./test-utils";

beforeEach(() => {
  localStorage.clear();
});

test("flujo principal: buscar → ver ficha → marcar favorito → aparece en /favoritos", async () => {
  const user = userEvent.setup();
  renderApp("/buscar");

  // 1. Buscar: la lista muestra los albergues
  expect(screen.getByTestId("buscar-page")).toBeInTheDocument();
  expect(screen.getByTestId("hostel-card-h-001")).toBeInTheDocument();

  // 2. Ver ficha del albergue
  await user.click(screen.getByTestId("hostel-view-h-001"));
  expect(screen.getByTestId("albergue-page")).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Albergue San Nicolás" }),
  ).toBeInTheDocument();

  // 3. Marcar favorito (persiste en localStorage, sin red)
  await user.click(screen.getByTestId("favorite-h-001"));
  expect(JSON.parse(localStorage.getItem("cama-favoritos"))).toContain("h-001");

  // 4. Navegar a /favoritos desde el header: el albergue está ahí
  await user.click(screen.getByTestId("nav-favoritos"));
  expect(screen.getByTestId("favoritos-page")).toBeInTheDocument();
  expect(screen.getByTestId("hostel-card-h-001")).toBeInTheDocument();
  expect(
    screen.queryByText("Aún no tienes albergues guardados."),
  ).not.toBeInTheDocument();
});
