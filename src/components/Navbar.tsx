"use client";

import React from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  activeRoute?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Offers", href: "/offers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Navbar: React.FC<NavbarProps> = ({
  isOpen = false,
  onToggle,
  activeRoute = "/",
}) => {
  const handleNavClick = () => {
    if (onToggle && isOpen) {
      onToggle();
    }
  };

  const isActive = (href: string): boolean => activeRoute === href;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-green-600 border-b-2 border-green-600 pb-1"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className={`md:hidden fixed inset-0 z-30 top-16 bg-white transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="p-4">
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={handleNavClick}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "bg-green-100 text-green-600"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Button (reference for Header integration) */}
      {onToggle && (
        <button
          onClick={onToggle}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle Navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-gray-700" />
          ) : (
            <Menu className="w-5 h-5 text-gray-700" />
          )}
        </button>
      )}
    </>
  );
};

export default Navbar;
