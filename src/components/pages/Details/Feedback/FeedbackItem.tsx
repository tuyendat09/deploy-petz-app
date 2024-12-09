import { Review } from "@/types/Review";
import formatDate from "@/utils/formatDate";

export default function FeedbackItem({ review }: { review: Review }) {
  const starRating = review?.rating;
  return (
    <div className="200 my-12 flex gap-4 rounded-lg">
      <div>
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            {review.userId.userEmail}
          </h3>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Đánh giá vào ngày {formatDate(review.createdAt)}
          <div className="mt-1 flex items-center space-x-1 text-yellow-500">
            {[...Array(starRating)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-4 w-4"
              >
                <path d="M12 .587l3.668 7.429 8.207 1.151-6 5.731 1.417 8.102L12 18.897l-7.292 4.103 1.417-8.102-6-5.731 8.207-1.151z" />
              </svg>
            ))}
          </div>
        </p>

        <p className="mt-4 text-sm text-gray-700">
          {review?.reviewContent || "Không có đánh giá"}
        </p>
      </div>
    </div>
  );
}
