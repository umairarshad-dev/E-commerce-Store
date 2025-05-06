'use client';

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Navbar() {
  const { cartCount } = useCart();
  
  return (
    <nav className="bg-white text-[#000000] shadow px-24 py-2">
      <div className="flex justify-center mt-4 mb-4">
        <div className="w-[1440px] h-[48px] top-[62px] left-[100px] gap-14 flex items-center">
          <div className="w-[160px] h-[22px] font-bold text-[32px] leading-[100%] tracking-[0%] font-['Integral_CF']">
            <span className="font-family['Integral CF']">SHOP.CO</span>
          </div>

          <div className="w-[321px] h-[22px] gap-6 flex items-center">
            <a href="/shop" className="flex items-center gap-1 font-normal text-base leading-[100%] tracking-[0%] font-['satoshi']">
              Shop
              <img src="/dropdown.png" alt="Shop" className="w-[7px] h-[5px] mt-[2px]" />
            </a>
            <a href="/on-sale" className="font-normal text-base font-['satoshi']">On Sale</a>
            <a href="/new-arrivals" className="font-normal text-base font-['satoshi']">New Arrivals</a>
            <a href="/brands" className="font-normal text-base font-['satoshi']">Brands</a>
          </div>

          <div className="w-[577px] h-[48px] flex items-center gap-3 px-4 py-3 rounded-[62px] bg-[#F0F0F0]">
            <div className="w-[20.27px] h-[20.27px] flex items-center justify-center rounded-full">
              <img src="/frame.png" alt="Search" className="w-[14px] h-[14px]" />
            </div>
            <input
              type="text"
              placeholder="Search for products..."
              className="w-[400px] bg-transparent outline-none text-base font-normal leading-[100%] tracking-normal font-['satoshi']"
            />
          </div>
          <div className="w-[62px] h-[24px] flex items-center gap-[14px]">
            <Link href="/cart" className="relative">
              <div className="w-[22.12px] h-[20.25px] flex items-center justify-center rounded">
                <img src="/shopping cart.png" alt="Cart" className="w-full h-full object-contain" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
            
            <div className="w-[20.25px] h-[20.25px] flex items-center justify-center rounded">
              <img src="/profile icon.png" alt="Profile" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}