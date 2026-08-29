import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

// Renderiza la app real (Header + rutas + Footer) en una ruta dada,
// con los mismos providers que main.jsx (HelmetProvider + Router).
export const renderApp = (route = "/") =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </HelmetProvider>,
  );
