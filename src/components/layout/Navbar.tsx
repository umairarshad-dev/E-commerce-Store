'use client';

import { useCart } from "@/components/lib/context/CartContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cartCount } = useCart();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const navLinkClass = "relative transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-black after:origin-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100";

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const getLinkClass = (path: string) => {
    const baseClass = navLinkClass;
    if (isActive(path)) {
      return `${baseClass} text-black font-semibold after:scale-x-100 after:origin-left`;
    }
    return `${baseClass} text-gray-600 hover:text-black`;
  };

  useEffect(() => {
    setIsMounted(true);
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
            <Link href="/" className={getLinkClass('/')}>Home</Link>
            <Link href="/shop" className={getLinkClass('/shop')}>Shop</Link>
            <Link href="/new-arrivals" className={getLinkClass('/new-arrivals')}>New Arrivals</Link>
            <Link href="/on-sale" className={getLinkClass('/on-sale')}>Offers</Link>
            <Link href="/about" className={getLinkClass('/about')}>About</Link>
            <Link href="/contact" className={getLinkClass('/contact')}>Contact</Link>
            <Link href="/track-order" className={getLinkClass('/track-order')}>Track Order</Link>
          </div>

           <div className="flex items-center gap-4 md:gap-6">
            {isMounted && isMobile && (
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
            <Link href="/wishlist">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </Link>
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
          </div>
        </div>
      </div>

       {isMounted && isMobile && isMenuOpen && (
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
            
             <div className="flex flex-col mt-4">
              <Link
                href="/"
                className={`py-4 border-b border-gray-100 text-lg font-medium ${isActive('/') ? 'text-black font-semibold' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className={`py-4 border-b border-gray-100 text-lg font-medium ${isActive('/shop') ? 'text-black font-semibold' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/new-arrivals"
                className={`py-4 border-b border-gray-100 text-lg font-medium ${isActive('/new-arrivals') ? 'text-black font-semibold' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link
                href="/on-sale"
                className={`py-4 border-b border-gray-100 text-lg font-medium ${isActive('/on-sale') ? 'text-black font-semibold' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Offers
              </Link>
              <Link
                href="/about"
                className={`py-4 border-b border-gray-100 text-lg font-medium ${isActive('/about') ? 'text-black font-semibold' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`py-4 border-b border-gray-100 text-lg font-medium ${isActive('/contact') ? 'text-black font-semibold' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/track-order"
                className={`py-4 border-b border-gray-100 text-lg font-medium ${isActive('/track-order') ? 'text-black font-semibold' : 'text-gray-600'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Track Order
              </Link>
            </div>

            {/* Account Options */}
            <div className="mt-6 pt-4 border-t border-gray-200">
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