'use client';

import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/types/product';

interface FeaturedProductsProps {
  /**
   * Products to display. Pass in the data from your `useProducts` hook, e.g.
   * `const { products } = useProducts()` then filter by `featured`.
   */
  products: Product[];
  /** Section heading. */
  title?: string;
  /** Optional supporting copy under the heading. */
  subtitle?: string;
  /** Loading state (e.g. `loading` from `useProducts`). */
  loading?: boolean;
  /** Error message (e.g. `error` from `useProducts`). */
  error?: string | null;
  /** Max number of products to render. */
  limit?: number;
  /** Add-to-cart handler, forwarded to each ProductCard. */
  onAddToCart?: (productId: string) => void;
  /** Favorite toggle handler, forwarded to each ProductCard. */
  onToggleFavorite?: (productId: string) => void;
  /** Set of favorited product ids. */
  favoriteIds?: string[];
  className?: string;
}

const SKELETON_COUNT = 5;

export function FeaturedProducts({
  products,
  title = 'Featured Products',
  subtitle,
  loading = false,
  error = null,
  limit,
  onAddToCart,
  onToggleFavorite,
  favoriteIds = [],
  className = '',
}: FeaturedProductsProps) {
  const featured = products.filter((product) => product.featured);
  const visible = typeof limit === 'number' ? featured.slice(0, limit) : featured;

  return (
    <section
      className={`w-full px-4 py-8 sm:px-6 lg:px-8 ${className}`}
      aria-labelledby="featured-products-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-1 text-center sm:text-left">
          <h2
            id="featured-products-heading"
            className="text-2xl font-bold text-gray-900 text-balance sm:text-3xl"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>

        {/* Error state */}
        {error && !loading && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm font-medium text-red-600"
          >
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                aria-hidden="true"
              >
                <div className="aspect-square w-full animate-pulse bg-gray-100" />
                <div className="flex flex-col gap-2 p-3">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
                  <div className="mt-1 h-8 w-full animate-pulse rounded-lg bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && visible.length === 0 && (
          <p className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
            No featured products available right now. Please check back soon.
          </p>
        )}

        {/* Product grid */}
        {!loading && !error && visible.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                isInStock={product.isAvailable && product.stock > 0}
                onAddToCart={onAddToCart}
                onToggleFavorite={onToggleFavorite}
                isFavorite={favoriteIds.includes(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
