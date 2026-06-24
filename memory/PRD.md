# Cama del Camino — PRD

## Problem statement (original, Spanish)
Construir un prototipo estático de landing page / directorio de albergues del Camino de Santiago.
- Nombre: **Cama del Camino**
- Target: peregrinos que buscan albergue en el Camino.
- Stack: React + Tailwind, sin backend, sin auth, sin DB, sin animaciones complejas, sin gradientes llamativos, sin emojis. Paleta: azul #2563eb, grises, blanco. Mobile-first.

User choice on first ask: **Option B — neutral placeholder blocks** instead of real images.

## Architecture
- React (CRA via craco) + Tailwind CSS + lucide-react.
- Entry: `src/index.js` → `src/main.jsx` → `src/App.jsx`.
- Components: `Header`, `Hero`, `SearchBar`, `RouteCards`, `HostelCards`, `CTASection`, `Footer` (each < 150 lines).
- Mock data: `src/data/routes.js`, `src/data/hostels.js`.
- No backend, no API calls, no `setTimeout` mocks — all handlers update local state only.

## User personas
- **Peregrino** (primary): explora rutas, busca albergue por localidad/etapa/fecha, ve precios y servicios.
- **Albergue owner** (secondary): llega por la CTA para listarse.

## Core requirements (static)
1. Sticky header with logo + 4 nav items.
2. Hero with title, subtitle, search bar (location, route, date, submit).
3. Stats row: 240+ albergues, 34 etapas, 0% comisión, 15k peregrinos/mes.
4. "Elige tu Camino" — 4 route cards.
5. "Albergues destacados" — 3 hostel cards with placeholder, name, town, route, price/cama, tags.
6. CTA for hostels.
7. Simple footer.

## What's implemented (2025-12)
- All 7 sections per brief, with `data-testid` attributes on every interactive element.
- Mobile-first responsive layout, hamburger menu, sticky header.
- Mock handlers in `App.jsx`: `onSearch` updates local state, `onSelectRoute` smooth-scrolls to search, `onJoin` smooth-scrolls to footer.
- 100% testing agent pass (frontend smoke + responsive checks).
- Removed legacy CRA `App.js` / `App.css` to keep repo clean for GitHub export.

## Prioritized backlog (not implemented, future)
- **P1**: Results page (`/buscar`) that filters mock hostels by the search form payload.
- **P1**: Individual hostel detail page (`/albergue/:id`) with full info, photo gallery, services list.
- **P2**: Saved-favourites using `localStorage` (still no backend).
- **P2**: Light/dark theme toggle (still within palette).
- **P3**: Multi-language toggle (ES / EN / FR / PT) — useful for foreign peregrinos.

## Next tasks list
- Validate brief sign-off with user.
- Decide on results / detail page scope before adding routing complexity.
