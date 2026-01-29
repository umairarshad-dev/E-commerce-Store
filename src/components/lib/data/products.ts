export interface Product {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  description?: string;
  brand?: string;
  colors?: Array<{ name: string; code: string }>;
  sizes?: string[];
  images?: string[];
  materials?: string;
  care?: string;
  dimensions?: string;
  origin?: string;
  stock?: number;
  reviewCount?: number;
  salePrice?: number;
  price?: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Gradient Graphic T-shirt',
    rating: 4.5,
    reviews: 4,
    currentPrice: 8999,
    originalPrice: 10999,
    discount: 20,
    salePrice: 8999,
    price: 10999,
    image: '/images/ecommerce-assets/product-09.jpg',
    description: 'Eye-catching gradient graphic t-shirt with modern design elements.',
    brand: 'Urban Style',
    colors: [
      { name: 'black', code: '#000' },
      { name: 'white', code: '#fff' },
      { name: 'blue', code: '#0066cc' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: ['/images/products/shirt06.png', '/images/products/T-shirt02.png', '/images/products/T-shirt03.png'],
    materials: '100% Cotton',
    care: 'Machine wash cold, tumble dry low',
    dimensions: 'Length: 28", Chest: 40"',
    origin: 'Made in USA',
    stock: 25,
    reviewCount: 4,
  },
  {
    id: 2,
    name: 'Polo with Tipping Details',
    rating: 3.5,
    reviews: 3,
    currentPrice: 10999,
    originalPrice: 12999,
    discount: 18,
    salePrice: 10999,
    price: 12999,
    image: '/images/ecommerce-assets/product-10.jpg',
    description: 'Classic polo shirt with contrasting tipping details for a sophisticated look.',
    brand: 'Premium Basics',
    colors: [
      { name: 'navy', code: '#000080' },
      { name: 'white', code: '#fff' },
      { name: 'red', code: '#ff0000' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: ['/images/products/shirt07.png', '/images/products/T-shirt02.png', '/images/products/T-shirt03.png'],
    materials: 'Cotton Blend',
    care: 'Machine wash cold, tumble dry low',
    dimensions: 'Length: 29", Chest: 42"',
    origin: 'Made in Portugal',
    stock: 15,
    reviewCount: 3,
  },
  {
    id: 3,
    name: 'Black Striped T-shirt',
    rating: 4.5,
    reviews: 4,
    currentPrice: 7999,
    salePrice: 7999,
    price: 7999,
    image: '/images/ecommerce-assets/product-11.jpg',
    description: 'Timeless black striped t-shirt with a modern twist.',
    brand: 'Classic Wear',
    colors: [
      { name: 'black', code: '#000' },
      { name: 'white', code: '#fff' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: ['/images/products/shirt08.png', '/images/products/T-shirt02.png', '/images/products/T-shirt03.png'],
    materials: '100% Organic Cotton',
    care: 'Machine wash cold, tumble dry low',
    dimensions: 'Length: 27", Chest: 38"',
    origin: 'Made in India',
    stock: 30,
    reviewCount: 4,
  },
  {
    id: 4,
    name: 'SKINNY FIT JEANS',
    rating: 4.5,
    reviews: 4.5,
    currentPrice: 9999,
    originalPrice: 11999,
    discount: 19,
    salePrice: 9999,
    price: 11999,
    image: '/images/ecommerce-assets/product-12.jpg',
    description: 'Modern skinny fit jeans with stretch comfort.',
    brand: 'Denim Co',
    colors: [
      { name: 'blue', code: '#4169e1' },
      { name: 'black', code: '#000' },
    ],
    sizes: ['28', '30', '32', '34', '36'],
    images: ['/images/products/pent01.png', '/images/products/pent02.png', '/images/products/pent03.png'],
    materials: '98% Cotton, 2% Elastane',
    care: 'Machine wash cold, tumble dry low',
    dimensions: 'Inseam: 32", Leg opening: 14"',
    origin: 'Made in Turkey',
    stock: 20,
    reviewCount: 5,
  },
  {
    id: 5,
    name: 'CHECKERED SHIRT',
    rating: 4.5,
    reviews: 4,
    currentPrice: 3999,
    originalPrice: 4999,
    discount: 20,
    salePrice: 3999,
    price: 4999,
    image: '/images/ecommerce-assets/product-13.jpg',
    description: 'Classic checkered shirt perfect for casual occasions.',
    brand: 'Retro Style',
    colors: [
      { name: 'red-black', code: '#8b0000' },
      { name: 'blue-black', code: '#000080' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: ['/images/products/shirt02.png', '/images/products/shirt03.png', '/images/products/shirt04.png'],
    materials: '100% Cotton Flannel',
    care: 'Machine wash cold, tumble dry low',
    dimensions: 'Length: 30", Chest: 44"',
    origin: 'Made in Pakistan',
    stock: 18,
    reviewCount: 4,
  },
  {
    id: 6,
    name: 'SLEEVE STRIPED T-SHIRT',
    rating: 4.5,
    reviews: 4.5,
    currentPrice: 9999,
    originalPrice: 10999,
    discount: 16,
    salePrice: 9999,
    price: 10999,
    image: '/images/ecommerce-assets/product-14.jpg',
    description: 'Sporty t-shirt with contrasting striped sleeves.',
    brand: 'Athletic Wear',
    colors: [
      { name: 'white-navy', code: '#fff' },
      { name: 'gray-red', code: '#808080' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: ['/images/products/shirt03.png', '/images/products/shirt04.png', '/images/products/shirt05.png'],
    materials: 'Performance Polyester Blend',
    care: 'Machine wash cold, hang dry',
    dimensions: 'Length: 28", Chest: 40"',
    origin: 'Made in Vietnam',
    stock: 22,
    reviewCount: 5,
  },
  {
    id: 7,
    name: 'VERTICAL STRIPED SHIRT',
    rating: 4.5,
    reviews: 4,
    currentPrice: 3999,
    originalPrice: 4999,
    discount: 27,
    salePrice: 3999,
    price: 4999,
    image: '/images/ecommerce-assets/product-15.jpg',
    description: 'Elegant vertical striped shirt for business casual look.',
    brand: 'Office Wear',
    colors: [
      { name: 'blue-white', code: '#4169e1' },
      { name: 'gray-white', code: '#808080' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: ['/images/products/shirt04.png', '/images/products/shirt05.png', '/images/products/shirt01.png'],
    materials: 'Cotton-Poly Blend',
    care: 'Machine wash cold, tumble dry low',
    dimensions: 'Length: 31", Chest: 42"',
    origin: 'Made in China',
    stock: 12,
    reviewCount: 4,
  },
  {
    id: 8,
    name: 'COURAGE GRAPHIC T-SHIRT',
    rating: 4.5,
    reviews: 4.5,
    currentPrice: 9999,
    originalPrice: 11999,
    discount: 13,
    salePrice: 9999,
    price: 11999,
    image: '/images/ecommerce-assets/product-16.jpg',
    description: 'Inspirational graphic t-shirt with courage message.',
    brand: 'Motivation Wear',
    colors: [
      { name: 'black', code: '#000' },
      { name: 'white', code: '#fff' },
      { name: 'gray', code: '#808080' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: ['/images/products/shirt06.png', '/images/products/T-shirt02.png', '/images/products/T-shirt03.png'],
    materials: '100% Ringspun Cotton',
    care: 'Machine wash cold, tumble dry low',
    dimensions: 'Length: 28", Chest: 40"',
    origin: 'Made in USA',
    stock: 28,
    reviewCount: 5,
  },
  {
    id: 9,
    name: 'LOOSE FIT BERMUDA SHORTS',
    rating: 4.5,
    reviews: 4,
    currentPrice: 3999,
    originalPrice: 4999,
    discount: 16,
    salePrice: 3999,
    price: 4999,
    image: '/images/products/pent01.png',
    description: 'Comfortable loose fit bermuda shorts for summer.',
    brand: 'Beach Wear',
    colors: [
      { name: 'khaki', code: '#c3b091' },
      { name: 'navy', code: '#000080' },
      { name: 'black', code: '#000' },
    ],
    sizes: ['30', '32', '34', '36', '38'],
    images: ['/images/products/pent01.png', '/images/products/pent02.png', '/images/products/pent03.png'],
    materials: '100% Cotton Twill',
    care: 'Machine wash cold, tumble dry low',
    dimensions: 'Inseam: 10", Waist: adjustable',
    origin: 'Made in Bangladesh',
    stock: 35,
    reviewCount: 4,
  },
];

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

export function getRelatedProducts(currentProductId: number, limit: number = 4): Product[] {
  return products
    .filter(product => product.id !== currentProductId)
    .slice(0, limit);
}
