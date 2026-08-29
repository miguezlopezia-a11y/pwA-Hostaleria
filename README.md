# Cama del Camino

Prototipo frontend-only de un directorio de albergues del Camino de Santiago: landing, búsqueda por localidad/etapa, ficha de albergue y favoritos.

> **Estado:** prototipo visual/mock. **Sin backend, sin tests automatizados y sin destino de despliegue configurado** (ver secciones abajo). Todos los datos son mock (`frontend/src/data/`).

## Estructura del repo

```
pwA-Hostaleria/
├── frontend/               # CRA 5 (vía craco) + React 19 + React Router 7 + Tailwind CSS 3
│   ├── public/             # index.html, manifest.json, service-worker.js, iconos PNG,
│   │                       # robots.txt, sitemap.xml, _redirects
│   └── src/
│       ├── components/     # Header, Hero, SearchBar, RouteCards, HostelCard(s), JoinModal,
│       │                   # FavoriteButton, CTASection, Footer, ErrorBoundary
│       ├── pages/          # Home, Buscar, AlbergueDetalle, Favoritos, NotFound
│       ├── data/           # hostels.js, routes.js (datos mock)
│       ├── hooks/          # useFavoritos.js (localStorage)
│       ├── App.jsx         # router: / /buscar /albergue/:id /favoritos
│       └── main.jsx        # entry + registro del service worker
├── memory/
│   └── PRD.md              # PRD original (documento histórico, ver nota abajo)
└── README.md
```

## Arranque rápido

```bash
cd frontend
npm install
npm start          # http://localhost:3000
npm run build      # build de producción en frontend/build/
```

El script `npm test` existe (heredado de CRA) pero **no hay tests automatizados** en el repo.

## Documento histórico de requisitos

`memory/PRD.md` es el PRD original con el que se generó el prototipo (paleta, personas, requisitos de la landing). Se conserva como referencia histórica, pero **parte de su contenido ya no es cierto**: por ejemplo menciona `src/index.js` como entry (el entry real hoy es `src/main.jsx`) y describe la app sin router ni PWA, que se añadieron después.

## Seguridad (`npm audit`)

`npm audit` reporta **38 vulnerabilidades (13 low / 6 moderate / 19 high / 0 critical)**, todas colgando del árbol de `react-scripts@5.0.1` (dependencia directa y vía `@craco/craco`) — es decir, **tooling de build/dev, no código que se sirve al navegador**. `npm audit fix` no resuelve ninguna sin `--force`, y `--force` instalaría `react-scripts@0.0.0` (rompe el build): **no ejecutar**.

Un fix real requiere migrar de CRA/react-scripts a otra herramienta de build (p.ej. Vite — `craco` ya actúa como parche parcial). **Decisión futura pendiente, no ejecutada.**

## Despliegue

No hay destino de despliegue configurado (no existe `vercel.json`, `netlify.toml`, `Dockerfile` ni CI). `frontend/public/_redirects` (`/* /index.html 200`) sugiere que la intención original era **Netlify**, pero no hay cuenta ni servicio conectado.
