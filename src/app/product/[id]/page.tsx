import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductById, getRelatedProducts } from '@/components/lib/data/products';
import PDPClient from './PDPClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(parseInt(id));
  if (!product) return { title: 'Product not found' };

  return {
    title: `${product.name} | E-Commerce Store`,
    description: product.description ?? `Shop ${product.name} at the best price.`,
    openGraph: {
      title: product.name,
      description: product.description ?? '',
      images: [product.images?.[0] ?? product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(parseInt(id));
  if (!product) notFound();

  const related = getRelatedProducts(product.id, 4);

  /* JSON-LD Product schema */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images ?? [product.image],
    description: product.description ?? '',
    sku: `PROD-${product.id}`,
    brand: { '@type': 'Brand', name: product.brand ?? 'E-Commerce Store' },
    offers: {
      '@type': 'Offer',
      url:          `https://yourstore.com/product/${product.id}`,
      priceCurrency: 'PKR',
      price:         product.salePrice ?? product.currentPrice,
      priceValidUntil: '2027-12-31',
      availability:  (product.stock ?? 10) > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'E-Commerce Store' },
    },
    aggregateRating: {
      '@type':       'AggregateRating',
      ratingValue:   product.rating,
      reviewCount:   product.reviews,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PDPClient product={product} relatedProducts={related} />
    </>
  );
}
