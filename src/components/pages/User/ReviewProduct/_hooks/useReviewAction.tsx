import {
  ReviewQueryParams,
  useGetReviewQuery,
} from "@/libs/features/services/product";
import formatSelectedKeys from "@/utils/formatSelectedValue";
import { skipToken } from "@reduxjs/toolkit/query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useReviewAction() {
  const { data: session, status } = useSession();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Status"]));
  const [userId, setUserId] = useState();
  const [isReview, setIsReview] = useState(false);
  const [reviewId, setReviewId] = useState("");

  const [queryParams, setQueryParams] = useState<ReviewQueryParams>({});

  const handleReview = (bookingId: string) => {
    setIsReview(true);
    setReviewId(bookingId);
  };

  const handleCancelReview = () => {
    setIsReview(false);
    setReviewId("");
  };

  useEffect(() => {
    if (formatSelectedKeys(selectedKeys) !== "Status") {
      setQueryParams((prev) => ({
        ...prev,
        ratingStatus: formatSelectedKeys(selectedKeys) as any,
      }));
    }
    if (session) {
      setUserId(session?.user._id as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKeys, session]);

  const { data: reviewList } = useGetReviewQuery(
    userId
      ? {
          userId: userId && userId,
          ...queryParams,
        }
      : skipToken,
  );

  function handleClearQuery() {
    setQueryParams({});
    setSelectedKeys(new Set(["Status"]));
  }

  return {
    reviewList,
    setSelectedKeys,
    selectedKeys,

    handleReview,
    isReview,
    handleCancelReview,
    reviewId,
    handleClearQuery,
  };
}
