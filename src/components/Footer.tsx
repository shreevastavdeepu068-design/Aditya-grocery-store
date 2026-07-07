"use client";

import React from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* Main Footer Content */}
      <div className="px-4 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Store Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-green-400">Aditya Store</h3>
              <p className="text-sm text-gray-400">
                Fast and reliable online grocery delivery service in Kasganj.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span>Tajpur Road, Sidhpura, Kasganj</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <a href="tel:+919548924542" className="hover:text-green-400 transition-colors">
                    +91 9548924542
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <a href="mailto:info@aditya-store.local" className="hover:text-green-400 transition-colors">
                    info@aditya-store.local
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    Offers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    Track Order
                  </a>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Policies</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-green-400 hover:text-gray-900 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-green-400 hover:text-gray-900 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-green-400 hover:text-gray-900 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-green-400 hover:text-gray-900 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 my-8" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <p>
              © {currentYear} Aditya Store. All rights reserved. | Delivery within 15 km radius
            </p>
            <p className="mt-4 md:mt-0">
              Developed with ❤️ for Kasganj community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
