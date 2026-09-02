import { useEffect, useState } from "react";
import { MapPin, Calendar, Search } from "lucide-react";

export const SearchBar = ({
  onSearch,
  defaultLocation = "",
  defaultDate = "",
}) => {
  const [location, setLocation] = useState(defaultLocation);
  const [date, setDate] = useState(defaultDate);

  useEffect(() => {
    setLocation(defaultLocation);
    setDate(defaultDate);
  }, [defaultLocation, defaultDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.({ location, date });
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="search-form"
      className="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-12">
        <label className="md:col-span-6 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 focus-within:border-blue-600">
          <MapPin className="h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Localidad o albergue"
            data-testid="search-location"
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
        </label>

        <label className="md:col-span-3 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 focus-within:border-blue-600">
          <Calendar className="h-4 w-4 text-slate-500" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            data-testid="search-date"
            className="w-full bg-transparent text-sm text-slate-900 focus:outline-none"
          />
        </label>

        <button
          type="submit"
          data-testid="search-submit"
          className="md:col-span-3 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-blue-700"
        >
          <Search className="h-4 w-4" />
          Buscar
        </button>
      </div>
    </form>
  );
};
