import { Icon } from "@iconify/react/dist/iconify.js";

interface RatingBarProps {
  star: number;
  totalRating: number;
}

export default function RatingBar({ star, totalRating }: RatingBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[14px] font-bold">
        <div className="flex items-center gap-0.5">
          <Icon className="text-gray-400" icon="prime:star-fill" />
          <div>{star}</div>
        </div>

        <div
          style={{ width: `${star * 80}px` }}
          className={`h-1.5 rounded-full bg-primary`}
        />

        <div>{totalRating}</div>
      </div>
    </div>
  );
}
