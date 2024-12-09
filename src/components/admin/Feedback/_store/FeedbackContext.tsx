import { createContext, useContext, ReactNode } from "react";
import useReviewAction from "../_hook/useReviewAction";

interface ReviewContextProps {
  isLoading: any;
  reviewList: any;
  starFilter: any;
  handleClearQuery: any;
  handleSetPage: any;
  page: any;
  totalPages: any;
  handleViewReviewDetail: any;
  handleCancelReviewDetail: any;
  viewDetail: any;
  reviewId: any;
}

const ReviewContext = createContext<ReviewContextProps | undefined>(undefined);

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const {
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
  } = useReviewAction({ initialPage: 1 });

  return (
    <ReviewContext.Provider
      value={{
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
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error("useReviewContext must be used within a ReviewProvider");
  }
  return context;
};
