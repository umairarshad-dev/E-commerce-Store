'use client';

import React, { useState } from 'react';
import { ProductCard, QuickViewModal, usePremiumCart, type Product as PremiumProduct } from '@/components/premium';

const onSaleProducts: PremiumProduct[] = [
  {
    id: '1',
    slug: 'premium-cotton-tshirt',
    title: 'Premium Cotton T-Shirt',
    category: 'MEN · T-SHIRTS',
    fabric: 'COTTON',
    price: 2999,
    compareAtPrice: 4999,
    badge: 'SALE',
    images: ['/images/ecommerce-assets/shirt05.png'],
    colors: [
      { name: 'white', hex: '#fff' },
      { name: 'black', hex: '#000' },
      { name: 'navy', hex: '#000080' },
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
    slug: 'slim-fit-chinos',
    title: 'Slim Fit Chinos',
    category: 'MEN · PANTS',
    fabric: 'COTTON',
    price: 5999,
    compareAtPrice: 8999,
    badge: 'SALE',
    images: ['/images/ecommerce-assets/shirt06.png'],
    colors: [
      { name: 'khaki', hex: '#c3b091' },
      { name: 'black', hex: '#000' },
      { name: 'navy', hex: '#000080' },
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
    slug: 'classic-oxford-shirt',
    title: 'Classic Oxford Shirt',
    category: 'MEN · SHIRTS',
    fabric: 'COTTON',
    price: 4499,
    compareAtPrice: 6999,
    badge: 'SALE',
    images: ['/images/ecommerce-assets/shirt07.png'],
    colors: [
      { name: 'white', hex: '#fff' },
      { name: 'blue', hex: '#0066cc' },
      { name: 'pink', hex: '#ffc0cb' },
    ],
    sizes: [
      { label: 'Small', inStock: true },
      { label: 'Medium', inStock: true },
      { label: 'Large', inStock: true },
      { label: 'X-Large', inStock: true },
    ],
  },
  {
    id: '4',
    slug: 'denim-jacket',
    title: 'Denim Jacket',
    category: 'MEN · JACKETS',
    fabric: 'DENIM',
    price: 7999,
    compareAtPrice: 11999,
    badge: 'SALE',
    images: ['/images/ecommerce-assets/shirt08.png'],
    colors: [
      { name: 'blue', hex: '#4169e1' },
      { name: 'black', hex: '#000' },
    ],
    sizes: [
      { label: 'Small', inStock: true },
      { label: 'Medium', inStock: true },
      { label: 'Large', inStock: true },
      { label: 'X-Large', inStock: true },
    ],
  },
  {
    id: '5',
    slug: 'casual-hoodie',
    title: 'Casual Hoodie',
    category: 'MEN · HOODIES',
    fabric: 'COTTON BLEND',
    price: 3999,
    compareAtPrice: 6499,
    badge: 'SALE',
    images: ['/images/ecommerce-assets/product-13.jpg'],
    colors: [
      { name: 'gray', hex: '#808080' },
      { name: 'black', hex: '#000' },
      { name: 'navy', hex: '#000080' },
    ],
    sizes: [
      { label: 'Small', inStock: true },
      { label: 'Medium', inStock: true },
      { label: 'Large', inStock: true },
      { label: 'X-Large', inStock: true },
    ],
  },
  {
    id: '6',
    slug: 'tailored-blazer',
    title: 'Tailored Blazer',
    category: 'MEN · JACKETS',
    fabric: 'WOOL',
    price: 9999,
    compareAtPrice: 15999,
    badge: 'SALE',
    images: ['/images/ecommerce-assets/product-14.jpg'],
    colors: [
      { name: 'black', hex: '#000' },
      { name: 'navy', hex: '#000080' },
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
    id: '7',
    slug: 'polo-shirt',
    title: 'Polo Shirt',
    category: 'MEN · POLOS',
    fabric: 'COTTON',
    price: 3499,
    compareAtPrice: 5499,
    badge: 'SALE',
    images: ['/images/ecommerce-assets/product-15.jpg'],
    colors: [
      { name: 'white', hex: '#fff' },
      { name: 'black', hex: '#000' },
      { name: 'red', hex: '#ff0000' },
    ],
    sizes: [
      { label: 'Small', inStock: true },
      { label: 'Medium', inStock: true },
      { label: 'Large', inStock: true },
      { label: 'X-Large', inStock: true },
    ],
  },
  {
    id: '8',
    slug: 'slim-fit-jeans',
    title: 'Slim Fit Jeans',
    category: 'MEN · JEANS',
    fabric: 'DENIM',
    price: 5499,
    compareAtPrice: 8499,
    badge: 'SALE',
    images: ['/images/ecommerce-assets/product-16.jpg'],
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

export default function OnSalePage() {
  const { addToCart } = usePremiumCart();
  const [selectedProduct, setSelectedProduct] = useState<PremiumProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const productsPerPage = 8;

  const paginatedProducts = onSaleProducts.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );
  const totalPages = Math.ceil(onSaleProducts.length / productsPerPage);

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
          <h1 className="font-['Integral_CF'] font-bold text-4xl md:text-5xl text-black mb-8">On Sale</h1>
          <p className="text-gray-600 mb-12">Discover our latest sale items with amazing discounts!</p>
          
          {/* Filter and sort section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 5h16M5 10h10M8 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Filters
              </button>
            </div>
            
            <div className="relative">
              <select className="px-4 py-2 pr-8 border border-gray-800 rounded-lg bg-white text-black font-medium appearance-none cursor-pointer hover:bg-gray-50 transition-colors">
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 items-stretch">
            {paginatedProducts.map((product) => (
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

          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-300 text-black disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm flex items-center gap-1 sm:gap-2 hover:bg-gray-50 transition-colors"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="hidden sm:inline">Previous</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm flex items-center justify-center transition-colors font-medium ${
                    page === p
                      ? 'bg-black text-white'
                      : 'border border-gray-300 text-black hover:bg-gray-50'
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}

              <button
                className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-300 text-black disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm flex items-center gap-1 sm:gap-2 hover:bg-gray-50 transition-colors"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                <span className="hidden sm:inline">Next</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </nav>
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
