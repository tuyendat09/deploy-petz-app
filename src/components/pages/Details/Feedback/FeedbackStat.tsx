"use client";

import RatingBar from "./RatingBar";
import RatingCount from "./RatingCount";
import RatingAvg from "./RatingAvg";
import FeedbackItem from "./FeedbackItem";

export default function FeedbackStat({
  reviews,
  totalReview,
  reviewCount,
}: {
  reviews: any;
  totalReview: any;
  reviewCount: any;
}) {
  const totalRatings = reviews?.length;

  // Tính số lượng đánh giá từ 4-5 sao
  const highRatingsCount = reviews?.filter(
    (review: any) => review.rating >= 4,
  ).length;

  // Tính phần trăm đánh giá 4-5 sao
  const highRatingsPercentage =
    totalRatings > 0 ? Math.round((highRatingsCount / totalRatings) * 100) : 0;

  const formatCount = (count: number) => {
    if (count) {
      if (count >= 1000 && count < 1000000) {
        return `${(count / 1000).toFixed(1)}k`;
      } else if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
      }
      return count.toString();
    }
  };

  const avgRating = totalReview / reviewCount;

  const countByStars = (star: number) =>
    reviews?.filter((review: any) => review.rating === star).length;

  return (
    <div>
      <div className="flex gap-24">
        <RatingCount
          totalReview={formatCount(totalRatings)}
          highRatingsCount={highRatingsPercentage}
        />
        <div className="w-0.5 rounded-full bg-gray-300 opacity-50" />
        <RatingAvg avgRating={avgRating} />
        <div className="w-0.5 rounded-full bg-gray-300 opacity-50" />
        <div className="flex flex-col">
          <RatingBar star={5} totalRating={countByStars(5)} />
          <RatingBar star={4} totalRating={countByStars(4)} />
          <RatingBar star={3} totalRating={countByStars(3)} />
          <RatingBar star={2} totalRating={countByStars(2)} />
          <RatingBar star={1} totalRating={countByStars(1)} />
        </div>
      </div>
    </div>
  );
}
