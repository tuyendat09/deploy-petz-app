import { useGetReviewQuery } from "@/libs/features/services/product";
import { warningModal } from "@/utils/callModalANTD";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";
import { animatePageOut } from "@/utils/animation";
import { useRouter } from "next/navigation";

export default function Notification() {
  const session = useSession();
  const userId = useMemo(() => session.data?.user._id, [session.data]);
  const { data } = useGetReviewQuery(
    userId ? { userId: userId, limit: 99, ratingStatus: "no" } : skipToken,
  );
  const router = useRouter();

  useEffect(() => {
    if (data && (data as any).reviews?.length > 0) {
      warningModal({
        content: (
          <div className="flex gap-2">
            <p>Bạn có {(data as any).reviews.length} sản phẩm chưa đánh giá.</p>
            <div
              onClick={() => {
                animatePageOut("/user/review-product", router);
              }}
              className="cursor-pointer text-blue-500"
            >
              Đánh giá ngay
            </div>
          </div>
        ),
        duration: 2,
      });
    }
  }, [data, router]);

  return null;
}
