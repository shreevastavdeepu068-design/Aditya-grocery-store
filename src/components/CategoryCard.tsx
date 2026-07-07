'use client';

import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  itemCount?: number;
  onSelect?: (categoryId: string) => void;
  isActive?: boolean;
  className?: string;
}

export function CategoryCard({
  id,
  name,
  icon: Icon,
  itemCount = 0,
  onSelect,
  isActive = false,
  className = '',
}: CategoryCardProps) {
  const handleClick = () => {
    onSelect?.(id);
  };

  const baseStyles =
    'flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-200 cursor-pointer';
  const activeStyles = isActive
    ? 'bg-green-500 text-white shadow-md'
    : 'bg-white border border-gray-200 text-gray-700 hover:border-green-500 hover:shadow-sm';

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${activeStyles} ${className}`}
      aria-pressed={isActive}
      aria-label={`${name} category${itemCount > 0 ? ` with ${itemCount} items` : ''}`}
      role="button"
    >
      <Icon
        className="w-6 h-6 mb-2 flex-shrink-0"
        aria-hidden="true"
      />
      <span className="text-sm font-medium text-center line-clamp-2">
        {name}
      </span>
      {itemCount > 0 && (
        <span className="text-xs mt-1 opacity-75">
          {itemCount}
        </span>
      )}
    </button>
  );
}
