'use client';
import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon, ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
const colors = [
  { name: 'green', code: '#22c55e' },
  { name: 'red', code: '#ef4444' },
  { name: 'yellow', code: '#facc15' },
  { name: 'orange', code: '#fb923c' },
  { name: 'blue', code: '#0ea5e9' },
  { name: 'cyan', code: '#06b6d4' },
  { name: 'pink', code: '#ec4899' },
  { name: 'black', code: '#000' },
];
const sizes = [
  'XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'
];
const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

interface Product {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  image: string;
}

const ProductCard = ({
  id,
  name,
  rating,
  reviews,
  currentPrice,
  originalPrice,
  discount,
  image,
}: Product) => {
  return (
    <Link href={`/product/${id}`} className="flex flex-col items-center hover:opacity-90 transition-opacity w-full">
      <div className="relative w-full aspect-square">
        <img
          src={image}
          alt={name}
          className="w-65 h-100 rounded-3xl bg-[#F0EEED] object-cover"
        />
        {discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
      </div>
      <div className="pt-4 w-full">
        <h3 className="text-black font-bold text-lg md:text-xl leading-none tracking-normal align-middle line-clamp-2">{name}</h3>
        <div className="flex items-center mt-1">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-gray-500 text-sm">({reviews})</span>
        </div>
        <div className="mt-2">
          <span className="pr-2 text-black font-sans font-bold text-xl md:text-2xl leading-none tracking-normal align-middle">${currentPrice}</span>
          {originalPrice && (
            <span className="text-black/40 font-bold text-xl md:text-2xl leading-none tracking-normal align-middle line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

const products: Product[] = [
  {
    id: 1,
    name: 'Gradient Graphic T-shirt',
    rating: 4.5,
    reviews: 4,
    currentPrice: 145,
    image: '/shirt06.png',
  },
  {
    id: 2,
    name: 'Polo with Tipping Details',
    rating: 3.5,
    reviews: 3,
    currentPrice: 180,
    image: '/shirt07.png',
  },
  {
    id: 3,
    name: 'Black Striped T-shirt',
    rating: 4.5,
    reviews: 4,
    currentPrice: 120,
    image: '/shirt08.png',
  },
  {
    id: 4,
    name: 'SKINNY FIT JEANS',
    rating: 4.5,
    reviews: 4.5,
    currentPrice: 210,
    image: '/pent01.png',
  },
  {
    id: 5,
    name: 'CHECKERED SHIRT',
    rating: 4.5,
    reviews: 4,
    currentPrice: 80,
    image: '/shirt02.png',
  },
  {
    id: 6,
    name: 'SLEEVE STRIPED T-SHIRT',
    rating: 4.5,
    reviews: 4.5,
    currentPrice: 210,
    image: '/shirt03.png',
  },
  {
    id: 7,
    name: 'VERTICAL STRIPED SHIRT',
    rating: 4.5,
    reviews: 4,
    currentPrice: 80,
    image: '/shirt04.png',
  },
  {
    id: 8,
    name: 'COURAGE GRAPHIC T-SHIRT',
    rating: 4.5,
    reviews: 4.5,
    currentPrice: 210,
    image: '/shirt06.png',
  },
  {
    id: 9,
    name: 'LOOSE FIT BERMUDA SHORTS',
    rating: 4.5,
    reviews: 4,
    currentPrice: 80,
    image: '/shirt09.png',
  },
];

const MIN_PRICE = 0;
const MAX_PRICE = 200;

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('green');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [selectedDressStyle, setSelectedDressStyle] = useState('');
  const [price, setPrice] = useState([MIN_PRICE, MAX_PRICE]);
  const [page, setPage] = useState(1);

  const [openCategories, setOpenCategories] = useState(false);
  const [openColors, setOpenColors] = useState(false);
  const [openSizes, setOpenSizes] = useState(false);
  const [openDressStyle, setOpenDressStyle] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), price[1] - 1);
    setPrice([newMin, price[1]]);
  };
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), price[0] + 1);
    setPrice([price[0], newMax]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb and Sort */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <span className="text-sm text-black">Home</span>
          <img src="/drop-right.png" alt="Shop" className="w-[8.5px] h-[6.5px] mt-[2px] text-black" />
          <span className="text-sm text-black flex items-center gap-1">Casual</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-black hidden sm:inline">Showing 1-10 of 100 Products</span>
          <span className="text-sm text-black flex items-center gap-1">Sort by: <span className="font-semibold">Most Popular</span> <ChevronDownIcon className="w-4 h-4 text-black" /></span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filter toggle */}
          <button 
            className="md:hidden flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-full mb-4"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <FunnelIcon className="w-4 h-4" />
            Filters
          </button>

          {/* Filters - Hidden on mobile unless toggled */}
          <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="shadow-sm p-6 space-y-8 pb-20 rounded-[20px] px-[24px] py-[20px] gap-[24px] bg-white">
              <div className="flex items-center justify-between mb-2 w-full h-[27px]">
                <span className="font-[Satoshi] font-bold text-[20px] leading-[100%] tracking-[0%] align-middle text-[#000000]">
                  Filters
                </span>
                <FunnelIcon className="w-5 h-5 text-black" />
              </div>

              <div className="w-full border-b border-[#0000001A] border-[1px]"></div>

              <div>
                <button
                  className="flex items-center justify-between w-full mb-2 select-none"
                  onClick={() => setOpenCategories((v) => !v)}
                  type="button"
                >
                  <span className="font-semibold text-black">Categories</span>
                  {openCategories ? (
                    <ChevronDownIcon className="w-4 h-4 text-black transition-transform rotate-90" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4 text-black transition-transform -rotate-90" />
                  )}
                </button>
                {openCategories && (
                  <div className="space-y-1 w-full h-auto gap-[20px]">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex items-center justify-between font-[Satoshi] font-normal text-[16px] leading-[100%] tracking-[0%] text-[#00000099] w-full px-2 py-1 rounded-md hover:bg-gray-100 ${selectedCategory === cat ? 'font-bold' : ''}`}
                      >
                        <span>{cat}</span>
                        <ChevronRightIcon className="w-4 h-4 text-black" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  className="flex items-center justify-between w-full mb-2 select-none"
                  onClick={() => setOpenPrice((v) => !v)}
                  type="button"
                >
                  <span className="font-semibold text-black">Price</span>
                  {openPrice ? (
                    <ChevronDownIcon className="w-4 h-4 text-black transition-transform rotate-90" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4 text-black transition-transform -rotate-90" />
                  )}
                </button>
                {openPrice && (
                  <div className="py-2">
                    <div className="relative h-8 flex items-center">
                      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 bg-gray-100 rounded-full" />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 h-2 bg-black rounded-full"
                        style={{
                          left: `${((price[0] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                          right: `${100 - ((price[1] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                        }}
                      />
                      <input
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        value={price[0]}
                        onChange={handleMinChange}
                        className="absolute w-full h-8 bg-transparent appearance-none pointer-events-auto z-10"
                        style={{ pointerEvents: 'auto' }}
                      />
                      <input
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        value={price[1]}
                        onChange={handleMaxChange}
                        className="absolute w-full h-8 bg-transparent appearance-none pointer-events-auto z-10"
                        style={{ pointerEvents: 'auto' }}
                      />
                      <style>{`
                        input[type='range']::-webkit-slider-thumb {
                          -webkit-appearance: none;
                          appearance: none;
                          width: 24px;
                          height: 24px;
                          border-radius: 9999px;
                          background: #000;
                          cursor: pointer;
                          border: 2px solid #fff;
                          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
                          margin-top: -6px;
                        }
                        input[type='range']::-moz-range-thumb {
                          width: 24px;
                          height: 24px;
                          border-radius: 9999px;
                          background: #000;
                          cursor: pointer;
                          border: 2px solid #fff;
                          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
                        }
                        input[type='range']::-ms-thumb {
                          width: 24px;
                          height: 24px;
                          border-radius: 9999px;
                          background: #000;
                          cursor: pointer;
                          border: 2px solid #fff;
                          box-shadow: 0 1px 4px rgba(0,0,0,0.12);
                        }
                        input[type='range'] {
                          outline: none;
                        }
                        input[type='range']::-webkit-slider-runnable-track {
                          height: 2px;
                          background: transparent;
                        }
                        input[type='range']::-ms-fill-lower {
                          background: transparent;
                        }
                        input[type='range']::-ms-fill-upper {
                          background: transparent;
                        }
                      `}</style>
                    </div>
                    <div className="flex justify-between text-sm text-black mt-2">
                      <span>${price[0]}</span>
                      <span>${price[1]}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <button
                  className="flex items-center justify-between w-full mb-2 select-none"
                  onClick={() => setOpenColors((v) => !v)}
                  type="button"
                >
                  <span className="font-semibold text-black">Colors</span>
                  {openColors ? (
                    <ChevronDownIcon className="w-4 h-4 text-black transition-transform rotate-90" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4 text-black transition-transform -rotate-90" />
                  )}
                </button>
                {openColors && (
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${selectedColor === color.name ? 'border-black' : 'border-gray-200'}`}
                        style={{ backgroundColor: color.code }}
                      >
                        {selectedColor === color.name && color.name !== 'white' && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        )}
                        {selectedColor === color.name && color.name === 'white' && (
                          <span className="w-3 h-3 rounded-full bg-black block"></span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  className="flex items-center justify-between w-full mb-2 select-none"
                  onClick={() => setOpenSizes((v) => !v)}
                  type="button"
                >
                  <span className="font-semibold text-black">Size</span>
                  {openSizes ? (
                    <ChevronDownIcon className="w-4 h-4 text-black transition-transform rotate-90" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4 text-black transition-transform -rotate-90" />
                  )}
                </button>
                {openSizes && (
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 rounded-full text-sm border transition-all ${
                          selectedSize === size
                            ? 'bg-black text-white border-black'
                            : 'bg-[#F0F0F0] text-[#00000099] border-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  className="flex items-center justify-between w-full mb-2 select-none"
                  onClick={() => setOpenDressStyle((v) => !v)}
                  type="button"
                >
                  <span className="font-semibold text-black">Dress Style</span>
                  {openDressStyle ? (
                    <ChevronDownIcon className="w-4 h-4 text-black transition-transform rotate-90" />
                  ) : (
                    <ChevronRightIcon className="w-4 h-4 text-black transition-transform -rotate-90" />
                  )}
                </button>
                {openDressStyle && (
                  <div className="space-y-1 w-full h-auto gap-[20px]">
                    {dressStyles.map((style) => (
                      <button
                        key={style}
                        onClick={() => setSelectedDressStyle(style)}
                        className={`flex items-center justify-between font-[Satoshi] font-normal text-[16px] leading-[100%] tracking-[0%] text-[#00000099] w-full px-2 py-1 rounded-md hover:bg-gray-100 ${selectedDressStyle === style ? 'font-bold' : ''}`}
                      >
                        <span>{style}</span>
                        <ChevronRightIcon className="w-4 h-4 text-black" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="w-full bg-black text-white py-2 px-4 rounded-full mt-4 font-semibold">
                Apply Filter
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-10 flex justify-center">
              <nav className="flex items-center gap-2 flex-wrap justify-center">
                <button
                  className="px-3 py-1 sm:px-4 sm:py-2 rounded-full border text-black disabled:opacity-50 text-sm sm:text-base"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </button>
                {[1, 2, 3, 4, 5].map((p) => (
                  <button
                    key={p}
                    className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full border text-black text-sm sm:text-base ${
                      page === p ? 'bg-black text-white' : ''
                    }`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}
                <span className="px-2 text-black">...</span>
                <button
                  className="px-3 py-1 sm:px-4 sm:py-2 rounded-full border text-black text-sm sm:text-base"
                  onClick={() => setPage(10)}
                >
                  10
                </button>
                <button
                  className="px-3 py-1 sm:px-4 sm:py-2 rounded-full border text-black disabled:opacity-50 text-sm sm:text-base"
                  disabled={page === 10}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;