import { MapPin, BedDouble } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import { ReviewBadges } from "./ReviewBadges";

const PlaceholderImage = ({ label }) => (
  <div
    aria-hidden="true"
    className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-t-xl bg-slate-100"
  >
    <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_46%,#e2e8f0_47%,#e2e8f0_53%,transparent_54%)] bg-[length:14px_14px] opacity-60" />
    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm">
      <BedDouble className="h-5 w-5" />
    </div>
    <span className="sr-only">{label}</span>
  </div>
);

// Modelo real (useDirectory): { id (=slug), name, address, pricePerBed,
// freeBeds (null si la RPC no devolvió fila), googleReviewUrl, bookingReviewUrl }
export const HostelCard = ({ hostel, onView }) => {
  return (
    <article
      data-testid={`hostel-card-${hostel.id}`}
      className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow duration-150 hover:shadow-md"
    >
      <div className="relative">
        <PlaceholderImage label={hostel.name} />
        <FavoriteButton
          id={hostel.id}
          className="absolute right-3 top-3 shadow-sm"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-slate-900">{hostel.name}</h3>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="h-4 w-4 text-slate-400" />
          <span>{hostel.address}</span>
        </div>

        {hostel.freeBeds !== null &&
          (hostel.freeBeds > 0 ? (
            <p
              className="text-sm font-medium text-green-700"
              data-testid={`hostel-availability-${hostel.id}`}
            >
              {hostel.freeBeds} cama{hostel.freeBeds === 1 ? "" : "s"} libre
              {hostel.freeBeds === 1 ? "" : "s"}
            </p>
          ) : (
            <p
              className="text-sm font-medium text-red-600"
              data-testid={`hostel-availability-${hostel.id}`}
            >
              Sin disponibilidad
            </p>
          ))}

        <ReviewBadges
          googleReviewUrl={hostel.googleReviewUrl}
          bookingReviewUrl={hostel.bookingReviewUrl}
          testIdPrefix={`hostel-${hostel.id}`}
        />

        <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-500">Desde</p>
            <p className="text-xl font-semibold text-slate-900">
              {hostel.pricePerBed}€
              <span className="ml-1 text-sm font-normal text-slate-500">/ cama</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onView}
            data-testid={`hostel-view-${hostel.id}`}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-800 transition-colors duration-150 hover:border-blue-600 hover:text-blue-600"
          >
            Ver albergue
          </button>
        </div>
      </div>
    </article>
  );
};
