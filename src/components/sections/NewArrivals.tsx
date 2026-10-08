'use client';

import React, { useState } from 'react';
import { ProductCard, QuickViewModal, usePremiumCart, type Product as PremiumProduct } from '@/components/premium';

const products: PremiumProduct[] = [
  {
    id: '1',
    slug: 'modern-striped-shirt',
    title: 'Modern Striped Shirt',
    category: 'MEN · SHIRTS',
    fabric: 'COTTON',
    price: 4999,
    compareAtPrice: 6999,
    badge: 'NEW',
    images: ['/images/ecommerce-assets/shirt01.png'],
    colors: [
      { name: 'blue-white', hex: '#4169e1' },
      { name: 'black-white', hex: '#000' },
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
    slug: 'graphic-print-tshirt',
    title: 'Graphic Print T-Shirt',
    category: 'MEN · T-SHIRTS',
    fabric: 'COTTON',
    price: 2999,
    compareAtPrice: 3999,
    badge: 'NEW',
    images: ['/images/ecommerce-assets/shirt02.png'],
    colors: [
      { name: 'white', hex: '#fff' },
      { name: 'black', hex: '#000' },
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
    slug: 'premium-shorts',
    title: 'Premium Shorts',
    category: 'MEN · SHORTS',
    fabric: 'COTTON',
    price: 3499,
    compareAtPrice: 4999,
    badge: 'NEW',
    images: ['/images/ecommerce-assets/pent01.png'],
    colors: [
      { name: 'khaki', hex: '#c3b091' },
      { name: 'navy', hex: '#000080' },
      { name: 'black', hex: '#000' },
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
    slug: 'slim-fit-denim',
    title: 'Slim Fit Denim',
    category: 'MEN · JEANS',
    fabric: 'DENIM',
    price: 5999,
    compareAtPrice: 8499,
    badge: 'NEW',
    images: ['/images/ecommerce-assets/pent02.png'],
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

export default function NewArrivals() {
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
            New Arrival
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
            <button className="w-[132px] h-[48px] lg:w-[218px] lg:h-[52px] rounded-full py-4 px-8 border border-black/10 font-sans font-medium text-base leading-none tracking-normal text-black">
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