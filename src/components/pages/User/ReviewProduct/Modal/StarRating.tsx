interface StarRatingProps {
  handleRating: (value: number) => void;
  rating: number;
}

export default function StarRating({ handleRating, rating }: StarRatingProps) {
  return (
    <div className="flex items-center justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= rating}
          onClick={() => handleRating(star)}
        />
      ))}
    </div>
  );
}

interface StarProps {
  filled: boolean;
  onClick: () => void;
}

function Star({ filled, onClick }: StarProps) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "#FFD700" : "#E0E0E0"}
      className="size-12 cursor-pointer transition-all delay-75 duration-300"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
