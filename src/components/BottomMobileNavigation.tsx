'use client';

import { Home, Search, Heart, User, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavItem {
  href: string;
  icon: ReactNode;
  label: string;
  badge?: number;
  ariaLabel?: string;
}

interface BottomMobileNavigationProps {
  cartCount?: number;
  favoriteCount?: number;
  className?: string;
}

export function BottomMobileNavigation({
  cartCount = 0,
  favoriteCount = 0,
  className = '',
}: BottomMobileNavigationProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: '/',
      icon: <Home className="w-6 h-6" aria-hidden="true" />,
      label: 'Home',
      ariaLabel: 'Go to Home',
    },
    {
      href: '/search',
      icon: <Search className="w-6 h-6" aria-hidden="true" />,
      label: 'Search',
      ariaLabel: 'Search products',
    },
    {
      href: '/favorites',
      icon: <Heart className="w-6 h-6" aria-hidden="true" />,
      label: 'Favorites',
      badge: favoriteCount,
      ariaLabel: `Favorites${favoriteCount > 0 ? ` (${favoriteCount} items)` : ''}`,
    },
    {
      href: '/cart',
      icon: <ShoppingCart className="w-6 h-6" aria-hidden="true" />,
      label: 'Cart',
      badge: cartCount,
      ariaLabel: `Shopping cart${cartCount > 0 ? ` (${cartCount} items)` : ''}`,
    },
    {
      href: '/account',
      icon: <User className="w-6 h-6" aria-hidden="true" />,
      label: 'Account',
      ariaLabel: 'Go to Account',
    },
  ];

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 ${className}`}
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around h-16 max-w-full">
        {navItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-200 ${
                active
                  ? 'text-green-500'
                  : 'text-gray-600 hover:text-green-500'
              }`}
              aria-label={item.ariaLabel || item.label}
              aria-current={active ? 'page' : undefined}
            >
              <div className="relative flex items-center justify-center">
                {item.icon}

                {/* Badge */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className="absolute -top-1 -right-2 min-w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    aria-label={`${item.badge} ${item.label}`}
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>

              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Safe area for notch/rounded corners */}
      <div className="h-safe-bottom" />
    </nav>
  );
}
