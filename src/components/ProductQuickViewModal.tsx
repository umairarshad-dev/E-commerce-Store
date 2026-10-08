'use client';

import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/components/lib/context/CartContext';
import type { Product } from '@/components/lib/data/products';

interface ProductQuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickViewModal({ product, isOpen, onClose }: ProductQuickViewModalProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    const colorObj = product.colors?.find(c => c.name === selectedColor);
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.currentPrice,
      image: product.image,
      color: colorObj?.name || selectedColor,
      size: selectedSize,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <XMarkIcon className="w-6 h-6 text-black" />
        </button>

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="relative aspect-[3/4]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full rounded-2xl bg-[#F0EEED] object-cover"
              />
              {product.discount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                  {product.discount}% OFF
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <h2 className="text-black font-bold text-xl md:text-2xl leading-tight mb-2">{product.name}</h2>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-black font-bold text-xl md:text-2xl">PKR {product.currentPrice}</span>
                {product.originalPrice && (
                  <span className="text-black/40 font-bold text-xl md:text-2xl line-through">
                    PKR {product.originalPrice}
                  </span>
                )}
              </div>

              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-black mb-2">Color: <span className="font-normal">{selectedColor}</span></p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          selectedColor === color.name ? 'border-black' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                      >
                        {selectedColor === color.name && color.name !== 'white' && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {selectedColor === color.name && color.name === 'white' && (
                          <span className="w-3 h-3 rounded-full bg-black block"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-black mb-2">Size: <span className="font-normal">{selectedSize}</span></p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-full text-sm border transition-all ${
                          selectedSize === size
                            ? 'bg-black text-white border-black'
                            : 'bg-[#F0F0F0] text-black border-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm font-medium text-black mb-2">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-black font-bold"
                  >
                    -
                  </button>
                  <span className="text-black font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors text-black font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 px-6 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-black/90 transition-colors"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
