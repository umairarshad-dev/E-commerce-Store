'use client';

import React, { useState } from 'react';
import { ProductCard, QuickViewModal, usePremiumCart, type Product } from '@/components/premium';

const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'premium-cotton-tshirt',
    title: 'Premium Cotton T-Shirt',
    category: 'MEN · T-SHIRTS',
    fabric: 'COTTON',
    price: 2499,
    compareAtPrice: 3499,
    badge: 'SALE',
    images: [
      '/images/ecommerce-assets/shirt05.png',
      '/images/ecommerce-assets/shirt06.png',
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Gray', hex: '#808080' },
    ],
    sizes: [
      { label: 'XS', inStock: true },
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: false },
      { label: 'XXL', inStock: true },
    ],
  },
  {
    id: '2',
    slug: 'slim-fit-jeans',
    title: 'Slim Fit Denim Jeans',
    category: 'MEN · JEANS',
    fabric: 'DENIM',
    price: 3999,
    compareAtPrice: 4999,
    badge: 'NEW',
    images: [
      '/images/ecommerce-assets/pent01.png',
      '/images/ecommerce-assets/pent02.png',
    ],
    colors: [
      { name: 'Blue', hex: '#4169E1' },
      { name: 'Black', hex: '#000000' },
    ],
    sizes: [
      { label: '28', inStock: true },
      { label: '30', inStock: true },
      { label: '32', inStock: true },
      { label: '34', inStock: true },
      { label: '36', inStock: true },
    ],
  },
  {
    id: '3',
    slug: 'classic-hoodie',
    title: 'Classic Cotton Hoodie',
    category: 'MEN · HOODIES',
    fabric: 'COTTON BLEND',
    price: 4499,
    badge: 'BEST SELLER',
    images: [
      '/images/ecommerce-assets/product-13.jpg',
      '/images/ecommerce-assets/product-14.jpg',
    ],
    colors: [
      { name: 'Gray', hex: '#808080' },
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
    ],
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
    ],
  },
  {
    id: '4',
    slug: 'embroidered-kurta',
    title: 'Embroidered Traditional Kurta',
    category: 'MEN · KURTAS',
    fabric: 'COTTON',
    price: 5999,
    compareAtPrice: 7999,
    badge: 'SALE',
    images: [
      '/images/ecommerce-assets/shirt01.png',
      '/images/ecommerce-assets/shirt02.png',
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Black', hex: '#000000' },
    ],
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: false },
      { label: 'XL', inStock: true },
    ],
  },
  {
    id: '5',
    slug: 'leather-jacket',
    title: 'Premium Leather Jacket',
    category: 'MEN · JACKETS',
    fabric: 'LEATHER',
    price: 12999,
    badge: 'NEW',
    images: [
      '/images/ecommerce-assets/shirt03.png',
      '/images/ecommerce-assets/shirt04.png',
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' },
    ],
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
    ],
  },
  {
    id: '6',
    slug: 'linen-shirt',
    title: 'Linen Casual Shirt',
    category: 'MEN · SHIRTS',
    fabric: 'LINEN',
    price: 2999,
    images: [
      '/images/ecommerce-assets/shirt07.png',
      '/images/ecommerce-assets/shirt08.png',
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Blue', hex: '#4169E1' },
      { name: 'Pink', hex: '#FFC0CB' },
      { name: 'Beige', hex: '#F5F5DC' },
    ],
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
    ],
  },
  {
    id: '7',
    slug: 'track-pants',
    title: 'Athletic Track Pants',
    category: 'MEN · BOTTOMS',
    fabric: 'POLYESTER',
    price: 1999,
    compareAtPrice: 2499,
    badge: 'SALE',
    images: [
      '/images/ecommerce-assets/pent03.png',
      '/images/ecommerce-assets/product-15.jpg',
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Gray', hex: '#808080' },
    ],
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: false },
    ],
  },
  {
    id: '8',
    slug: 'polo-shirt',
    title: 'Classic Polo Shirt',
    category: 'MEN · POLOS',
    fabric: 'COTTON',
    price: 2299,
    badge: 'BEST SELLER',
    images: [
      '/images/ecommerce-assets/product-16.jpg',
      '/images/ecommerce-assets/shirt06.png',
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Red', hex: '#FF0000' },
    ],
    sizes: [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
      { label: 'XL', inStock: true },
    ],
  },
];

export default function PremiumDemoPage() {
  const { addToCart } = usePremiumCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: Product, size?: string, color?: string) => {
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
    product: Product,
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
    <div className="min-h-screen bg-[var(--page)]">
      <div className="px-4 py-12 md:px-8 lg:px-24">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-extrabold text-4xl md:text-5xl text-[var(--ink)] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              Premium Collection
            </h1>
            <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
              Discover our curated selection of premium clothing items. Quality fabrics, modern designs, and exceptional comfort.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 items-stretch">
            {mockProducts.map((product) => (
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
