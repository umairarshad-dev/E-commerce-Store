'use client';

import { useState } from 'react';
import { ProductCard, QuickViewModal, usePremiumCart, type Product as PremiumProduct } from '@/components/premium';

interface RelatedProductsProps {
  products: any[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const { addToCart } = usePremiumCart();
  const [selectedProduct, setSelectedProduct] = useState<PremiumProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());

  // Convert legacy product format to premium format
  const premiumProducts: PremiumProduct[] = products.map((product) => ({
    id: product.id.toString(),
    slug: product.name.toLowerCase().replace(/\s+/g, '-'),
    title: product.name,
    category: 'CLOTHING',
    price: product.salePrice || product.currentPrice,
    compareAtPrice: product.price || product.originalPrice,
    images: product.images || [product.image],
    colors: product.colors || [{ name: 'default', hex: '#000' }],
    sizes: product.sizes?.map((s: string) => ({ label: s, inStock: true })) || [
      { label: 'S', inStock: true },
      { label: 'M', inStock: true },
      { label: 'L', inStock: true },
    ],
  }));

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
    <div className="relative pb-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">You might also like</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 items-stretch">
        {premiumProducts.map((product) => (
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