import { Heart } from "lucide-react";
import { useFavoritos } from "../hooks/useFavoritos";

export const FavoriteButton = ({ id, className = "" }) => {
  const { toggle, isFavorite } = useFavoritos();
  const active = isFavorite(id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle(id);
      }}
      aria-label={active ? "Quitar de favoritos" : "Guardar en favoritos"}
      aria-pressed={active}
      data-testid={`favorite-${id}`}
      className={`
        inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-150
        ${
          active
            ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
            : "border-slate-200 bg-white text-slate-500 hover:border-blue-600 hover:text-blue-600"
        }
        ${className}
      `}
    >
      <Heart
        className={`h-4 w-4 ${active ? "fill-current" : ""}`}
        strokeWidth={active ? 2 : 2}
      />
    </button>
  );
};
