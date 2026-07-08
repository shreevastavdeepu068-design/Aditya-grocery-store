export interface Category {
  id: string;
  name: string;
 slug?: string;
  description?: string;
  image?: string;
  icon?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateCategoryPayload {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  icon?: string;
}

export interface UpdateCategoryPayload {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
  icon?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface CategoryResponse {
  success: boolean;
  message?: string;
  category?: Category;
}

export interface CategoriesResponse {
  success: boolean;
  categories: Category[];
}
