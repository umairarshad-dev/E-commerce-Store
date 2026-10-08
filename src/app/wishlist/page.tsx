'use client';

import { useState } from 'react';
import { ProductCard, QuickViewModal, usePremiumCart, type Product as PremiumProduct } from '@/components/premium';

const wishlistProducts: PremiumProduct[] = [
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
];

export default function WishlistPage() {
  const { addToCart } = usePremiumCart();
  const [selectedProduct, setSelectedProduct] = useState<PremiumProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set(wishlistProducts.map(p => p.id)));

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

  const filteredProducts = wishlistProducts.filter(p => wishlistedItems.has(p.id));

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="px-8 py-12">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-['Integral_CF'] font-bold text-4xl md:text-5xl text-black mb-4 text-center">
            My Wishlist
          </h1>
          <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            {filteredProducts.length} items saved
          </p>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 items-stretch">
              {filteredProducts.map((product) => (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Your wishlist is empty</p>
              <a href="/shop" className="inline-block bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Continue Shopping
              </a>
            </div>
          )}
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
