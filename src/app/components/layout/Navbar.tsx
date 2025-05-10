'use client';

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cartCount } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <nav className="bg-white text-black border-b sticky top-0 z-50 w-full">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-24 py-4">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="font-['Integral_CF'] font-bold text-2xl">
            SHOP.CO
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            <Link href="/shop" className="flex items-center gap-1 hover:text-gray-600">
              Shop
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
            <Link href="/on-sale" className="hover:text-gray-600">On Sale</Link>
            <Link href="/new-arrivals" className="hover:text-gray-600">New Arrivals</Link>
            <Link href="/brands" className="hover:text-gray-600">Brands</Link>
          </div>

          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4"
              />
              <img
                src="/search.png"
                alt="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {isMobile && (
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img src="/menu.png" alt="Menu" className="w-6 h-6" />
              </button>
            )}
            <Link href="/cart" className="relative">
              <img src="/shopping-cart.png" alt="Cart" className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/profile">
              <img src="/profile icon.png" alt="Profile" className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 pt-20 px-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6"
          >
            ✕
          </button>
          <div className="flex flex-col gap-6">
            <Link href="/shop" className="text-xl py-2 border-b">Shop</Link>
            <Link href="/on-sale" className="text-xl py-2 border-b">On Sale</Link>
            <Link href="/new-arrivals" className="text-xl py-2 border-b">New Arrivals</Link>
            <Link href="/brands" className="text-xl py-2 border-b">Brands</Link>
          </div>
        </div>
      )}
    </nav>
  );
}