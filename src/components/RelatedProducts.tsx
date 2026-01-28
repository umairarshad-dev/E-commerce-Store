'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type Product } from '@/data/products';

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 3;

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + productsPerPage
  );

  return (
    <div className="relative pb-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 justify-center items-center">You might also like</h2>
  
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group block"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600">${product.currentPrice}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}