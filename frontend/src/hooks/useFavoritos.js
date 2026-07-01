import { useCallback, useEffect, useState } from "react";

const KEY = "cama-favoritos";

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export const useFavoritos = () => {
  const [ids, setIds] = useState(read);

  useEffect(() => {
    const handle = () => setIds(read());
    window.addEventListener("favorites-change", handle);
    window.addEventListener("storage", handle);
    return () => {
      window.removeEventListener("favorites-change", handle);
      window.removeEventListener("storage", handle);
    };
  }, []);

  const toggle = useCallback((id) => {
    const current = read();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("favorites-change"));
  }, []);

  const isFavorite = useCallback((id) => ids.includes(id), [ids]);

  return { ids, toggle, isFavorite, count: ids.length };
};
