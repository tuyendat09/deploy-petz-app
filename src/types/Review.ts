export interface PaginateReview {
  reviews: Review[];
  page: number;
  totalPages: number;
}

export interface Review {
  _id: string;
  userId: { _id: string; userEmail: string };
  rating: number;
  productId: string;
  productName: string;
  createdAt: any;
  reviewContent: string;
  publicStatus: boolean;
}
