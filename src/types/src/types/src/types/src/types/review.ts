export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;

  rating: 1 | 2 | 3 | 4 | 5;

  title?: string;
  comment?: string;

  isVerifiedPurchase: boolean;

  createdAt: string;
  updatedAt?: string;
}

export interface CreateReviewPayload {
  productId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: string;
  comment?: string;
}

export interface UpdateReviewPayload {
  rating?: 1 | 2 | 3 | 4 | 5;
  title?: string;
  comment?: string;
}

export interface ReviewResponse {
  success: boolean;
  message?: string;
  review?: Review;
}

export interface ReviewsResponse {
  success: boolean;
  reviews: Review[];
}
