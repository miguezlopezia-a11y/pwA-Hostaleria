import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-lg font-semibold text-slate-900">Página no encontrada</p>
      <p className="text-sm text-slate-600">La página que buscas no existe o ha sido movida.</p>
      <Link to="/" className="text-sm text-blue-600 hover:text-blue-700">Volver al inicio</Link>
    </div>
  );
}
