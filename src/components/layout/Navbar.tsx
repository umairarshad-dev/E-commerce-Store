'use client';

import { useCart } from "@/components/lib/context/CartContext";
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
      <div className="w-full flex justify-center items-center mx-auto px-4 lg:px-24 py-4">
        <div className="container flex items-center justify-between w-full">
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

          {/* Search Bar - Desktop Only */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4"
              />
              <img
                src="/images/ui/search.png"
                alt="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40"
              />
            </div>
          </div>

           <div className="flex items-center gap-4 md:gap-6">
            {isMobile && (
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none p-2">
                {isMenuOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12h18M3 6h18M3 18h18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            )}
            <Link href="/cart" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
          </div>
        </div>
      </div>

       {isMobile && isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 pt-16">
          <div className="px-6">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
             <div className="pb-4 pt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4"
                />
                <img
                  src="/images/ui/search.png"
                  alt="Search"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40"
                />
              </div>
            </div>
            
             <div className="flex flex-col mt-4">
              <Link 
                href="/shop" 
                className="flex items-center justify-between py-4 border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-lg font-medium">Shop</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
              <Link 
                href="/on-sale" 
                className="py-4 border-b border-gray-100 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                On Sale
              </Link>
              <Link 
                href="/new-arrivals" 
                className="py-4 border-b border-gray-100 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link 
                href="/brands" 
                className="py-4 border-b border-gray-100 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Brands
              </Link>
            </div>
            
            {/* Account Options */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link 
                href="/profile" 
                className="flex items-center gap-3 py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="text-lg">My Account</span>
              </Link>
              <Link 
                href="/cart" 
                className="flex items-center gap-3 py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span className="text-lg">Cart ({cartCount})</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}