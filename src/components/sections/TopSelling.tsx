'use client';

import React, { useState } from 'react';
import { ProductCard, QuickViewModal, usePremiumCart, type Product as PremiumProduct } from '@/components/premium';

const products: PremiumProduct[] = [
  {
    id: '1',
    slug: 'vertical-striped-shirt',
    title: 'VERTICAL STRIPED SHIRT',
    category: 'MEN · SHIRTS',
    fabric: 'COTTON',
    price: 7999,
    compareAtPrice: 8999,
    badge: 'BEST SELLER',
    images: ['/images/ecommerce-assets/shirt03.png'],
    colors: [
      { name: 'blue-white', hex: '#4169e1' },
      { name: 'gray-white', hex: '#808080' },
    ],
    sizes: [
      { label: 'Small', inStock: true },
      { label: 'Medium', inStock: true },
      { label: 'Large', inStock: true },
      { label: 'X-Large', inStock: true },
    ],
  },
  {
    id: '2',
    slug: 'courage-graphic-tshirt',
    title: 'COURAGE GRAPHIC T-SHIRT',
    category: 'MEN · T-SHIRTS',
    fabric: 'COTTON',
    price: 5999,
    badge: 'BEST SELLER',
    images: ['/images/ecommerce-assets/shirt04.png'],
    colors: [
      { name: 'black', hex: '#000' },
      { name: 'white', hex: '#fff' },
      { name: 'gray', hex: '#808080' },
    ],
    sizes: [
      { label: 'Small', inStock: true },
      { label: 'Medium', inStock: true },
      { label: 'Large', inStock: true },
      { label: 'X-Large', inStock: true },
    ],
  },
  {
    id: '3',
    slug: 'fit-bermuda-shorts',
    title: 'FIT BERMUDA SHORTS',
    category: 'MEN · SHORTS',
    fabric: 'COTTON',
    price: 3999,
    badge: 'BEST SELLER',
    images: ['/images/ecommerce-assets/pent03.png'],
    colors: [
      { name: 'khaki', hex: '#c3b091' },
      { name: 'navy', hex: '#000080' },
    ],
    sizes: [
      { label: '30', inStock: true },
      { label: '32', inStock: true },
      { label: '34', inStock: true },
      { label: '36', inStock: true },
    ],
  },
  {
    id: '4',
    slug: 'faded-skinny-jeans',
    title: 'FADED SKINNY JEANS',
    category: 'MEN · JEANS',
    fabric: 'DENIM',
    price: 6999,
    badge: 'BEST SELLER',
    images: ['/images/ecommerce-assets/product-06.jpg'],
    colors: [
      { name: 'blue', hex: '#4169e1' },
      { name: 'black', hex: '#000' },
    ],
    sizes: [
      { label: '28', inStock: true },
      { label: '30', inStock: true },
      { label: '32', inStock: true },
      { label: '34', inStock: true },
      { label: '36', inStock: true },
    ],
  },
];

export default function TopSelling() {
  const { addToCart } = usePremiumCart();
  const [selectedProduct, setSelectedProduct] = useState<PremiumProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());

  const handleQuickView = (product: PremiumProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: PremiumProduct, size?: string, color?: string) => {
    const colorObj = product.colors.find((c) => c.name === color);
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
      color: colorObj?.name || color || 'Default',
      size: size || 'Default',
    });
  };

  const handleModalAddToCart = (
    product: PremiumProduct,
    size: string,
    color: string,
    quantity: number
  ) => {
    const colorObj = product.colors.find((c) => c.name === color);
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.images[0],
        color: colorObj?.name || color,
        size,
      });
    }
  };

  const handleWishlistToggle = (productId: string) => {
    setWishlistedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full bg-white">
      <div className="px-8 py-7">
        <div className="max-w-screen-xl mx-auto">
          <div className="font-['Integral CF'] font-bold text-4xl md:text-5xl text-black mb-8 text-center">
            Top Selling
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 items-stretch">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={handleQuickView}
                onAddToCart={handleAddToCart}
                onWishlistToggle={handleWishlistToggle}
                isWishlisted={wishlistedItems.has(product.id)}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button className="w-[132px] h-[48px] lg:w-[218px] lg:h-[52px] rounded-full py-4 px-8 border border-black/10 font-sans font-medium text-sm sm:text-base leading-none tracking-normal text-black hover:bg-gray-50 transition-colors">
              View All
            </button>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={handleModalAddToCart}
        />
      )}
    </div>
  );
}