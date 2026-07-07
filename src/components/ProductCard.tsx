'use client';

import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  unit?: string;
  rating?: number;
  isInStock?: boolean;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
  className?: string;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  unit = '1 kg',
  rating = 0,
  isInStock = true,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  className = '',
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    onAddToCart?.(id);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite?.(id);
  };

  return (
    <div
      className={`flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-200"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold"
            aria-label={`${discountPercent}% discount`}
          >
            -{discountPercent}%
          </div>
        )}

        {/* Stock Status */}
        {!isInStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">Out of Stock</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 left-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFavorite}
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400 hover:text-red-500'
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-3">
        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
          {name}
        </h3>

        {/* Unit */}
        <p className="text-xs text-gray-500 mb-2">{unit}</p>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <span className="text-xs font-medium text-gray-700">★ {rating.toFixed(1)}</span>
          </div>
        )}

        {/* Price Container */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-bold text-gray-900">
            ₹{price.toFixed(2)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">
              ₹{originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!isInStock}
          className="w-full flex items-center justify-center gap-2 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 font-medium text-sm"
          aria-label={`Add ${name} to cart`}
        >
          <ShoppingCart className="w-4 h-4" aria-hidden="true" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
