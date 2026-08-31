import { Star, ExternalLink } from "lucide-react";

// Badges de reseñas externas. Solo se renderiza un badge si la URL existe
// para ese hostal (restricción de la tarea: nunca un enlace roto).
export const ReviewBadges = ({ googleReviewUrl, bookingReviewUrl, testIdPrefix }) => {
  if (!googleReviewUrl && !bookingReviewUrl) return null;

  const pill =
    "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-blue-600 hover:text-blue-600";

  return (
    <div className="flex flex-wrap gap-1.5">
      {googleReviewUrl && (
        <a
          href={googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`${testIdPrefix}-review-google`}
          className={pill}
        >
          <Star className="h-3.5 w-3.5" />
          Reseñas en Google
        </a>
      )}
      {bookingReviewUrl && (
        <a
          href={bookingReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`${testIdPrefix}-review-booking`}
          className={pill}
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Reseñas en Booking
        </a>
      )}
    </div>
  );
};
