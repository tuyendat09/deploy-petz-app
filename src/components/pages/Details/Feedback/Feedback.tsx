import { useGetReviewQuery } from "@/libs/features/services/product";
import FeedbackItem from "./FeedbackItem";
import FeedbackStat from "./FeedbackStat";
import { Review } from "@/types/Review";

export default function Feedback({
  productId,
  totalReview,
  reviewCount,
}: {
  productId: string;
  totalReview: any;
  reviewCount: any;
}) {
  const { data: Review, isLoading } = useGetReviewQuery({
    productId: productId,
    publicStatus: true,
  });

  return (
    <section className="mt-[100px]">
      <h2 className="text-h2 font-bold">Đánh giá</h2>
      <div className="mt-6">
        <FeedbackStat
          totalReview={totalReview}
          reviewCount={reviewCount}
          reviews={Review?.reviews}
        />
        {Review?.reviews?.map((review: Review) => (
          <FeedbackItem review={review} key={review._id} />
        ))}
      </div>
    </section>
  );
}
