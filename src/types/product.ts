export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;

  price: number;
  originalPrice?: number;

  image: string;

  categoryId: string;
  categoryName?: string;

  stock: number;

  featured: boolean;
  bestseller: boolean;

  isAvailable: boolean;

  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;

  isActive: boolean;

  createdAt?: string;
}

export interface ProductFilter {
  categoryId?: string;
  featured?: boolean;
  bestseller?: boolean;
  search?: string;
  limit?: number;
}
