"use client";

import React from "react";
import { MapPin, Phone, ShoppingCart, User, Menu } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Top Info Bar */}
      <div className="hidden md:block bg-green-50 border-b border-green-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-green-600" />
              <span>Tajpur Road, Sidhpura, Kasganj</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-green-600" />
              <span>+91 9548924542</span>
            </div>
          </div>
          <span className="text-green-600 font-medium">🚚 Delivery within 15 km</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-4 py-3 md:py-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Menu">
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-green-600">Aditya Store</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="User Account">
                <User className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative" aria-label="Shopping Cart">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between gap-6">
            <h1 className="text-2xl font-bold text-green-600 whitespace-nowrap">
              Aditya Store
            </h1>
            <nav className="flex items-center gap-6 flex-1 ml-8">
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Categories
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                Offers
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                About
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="User Account">
                <User className="w-5 h-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative" aria-label="Shopping Cart">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
