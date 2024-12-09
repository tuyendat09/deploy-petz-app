import { useEffect, useState } from "react";
import formatSelectedKeys from "@/utils/formatSelectedValue";
import {
  ReviewQueryParams,
  useGetReviewQuery,
} from "@/libs/features/services/product";

interface useReviewActionProps {
  initialPage: number;
}

export default function useReviewAction({ initialPage }: useReviewActionProps) {
  const [starFilter, setStarFilter] = useState(new Set(["Đánh giá"]));
  const [sortStar, setSortStart] = useState(new Set(["Sắp xếp"]));
  const [queryParams, setQueryParams] = useState<ReviewQueryParams>({});
  const [viewDetail, setViewDetail] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const [page, setPage] = useState(initialPage);
  const { data: reviewList, isLoading } = useGetReviewQuery({
    ...queryParams,
    limit: 15,
    page: page,
  });

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (reviewList) {
      setTotalPages(reviewList.totalPages);
    }
  }, [reviewList]);

  const handleSetPage = (page: number) => {
    setPage(page);
  };

  const handleClearQuery = async () => {
    setQueryParams({});
  };

  useEffect(() => {
    if (formatSelectedKeys(starFilter) !== "Đánh giá") {
      setQueryParams((prev) => ({
        ...prev,
        star: formatSelectedKeys(starFilter),
      }));
    }
  }, [starFilter, sortStar]);

  function handleViewReviewDetail(ReviewId: string) {
    setViewDetail(true);
    setReviewId(ReviewId);
  }

  function handleCancelReviewDetail() {
    setViewDetail(false);
    setReviewId("");
  }

  return {
    isLoading,
    reviewList,
    starFilter,
    handleClearQuery,
    handleSetPage,
    page,
    totalPages,
    handleViewReviewDetail,
    handleCancelReviewDetail,
    viewDetail,
    reviewId,
  };
}
