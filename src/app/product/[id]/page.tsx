'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import { StarIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import RelatedProducts from '@/components/RelatedProducts';
import ProductReviews from '@/components/ProductReviews';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

interface ProductParams {
  id: string;
}

export default function ProductDetail({ params }: { params: Promise<ProductParams> }) {
  const [selectedColor, setSelectedColor] = useState('green');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [mainImage, setMainImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCart();
  
  const resolvedParams = use(params);
  const product = {
    id: resolvedParams.id,
    name: 'ONE LIFE GRAPHIC T-SHIRT',
    brand: 'Premium Basics',
    price: 300,
    salePrice: 260,
    discount: 40,
    colors: [
      { name: 'green', code: '#6B7A3C' },
      { name: 'black', code: '#000' },
      { name: 'green', code: '#006400' },
      { name: 'brown', code: '#7C5E3C' },
    ],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    images: [
      '/T-shite01.png',
      '/T-shirt02.png',
      '/T-shirt03.png',
    ],
    description:
      'Simple basics, made with comfort in mind for the everyday. Crafted from a soft and breathable cotton blend, this tee is perfect for any occasion.',
    materials: '100% Cotton',
    care: 'Machine wash cold, tumble dry low',
    dimensions: 'Length: 28", Chest: 40"',
    origin: 'Made in Portugal',
    rating: 4.6,
    reviewCount: 445,
    stock: 15,
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize
    });
    toast.success('Product added to cart!');
  };

  const relatedProducts = [
    {
      id: '2',
      name: 'Polo with Contrast Trims',
      price: 232,
      image: '/shirt07.png',
      originalPrice: 242,
      reviews: 3,
    },
    {
      id: '3',
      name: 'Gradient Graphic T-shirt',
      price: 145,
      image: '/shirt06.png',
      reviews: 4,
    },
    {
      id: '4',
      name: 'Polo with Tipping Details',
      price: 180,
      image: '/shirt08.png',
      reviews: 2,
    },
    {
      id: '5',
      name: 'Black Striped T-shirt',
      price: 120,
      image: '/shirt09.png',
      originalPrice: 150,
      reviews: 5,
    },
  ];

  const reviews = [
    {
      id: '1',
      user: 'Samantha D.',
      rating: 5,
      date: 'August 18, 2023',
      comment:
        'Great fit! The design is unique and the fabric feels nice. Comfortable for all-day wear. Highly recommend for anyone looking for a stylish tee.',
      helpful: 9,
    },
    {
      id: '2',
      user: 'Ethan B.',
      rating: 4,
      date: 'August 17, 2023',
      comment:
        'The t-shirt has a soft texture with an ergonomic, good design. The color is true to the picture. Sizing runs a bit large, so consider sizing down.',
      helpful: 7,
    },
    {
      id: '3',
      user: 'Liam K.',
      rating: 5,
      date: 'August 16, 2023',
      comment:
        'Lots of color options! A perfect casual tee. The fabric is soft, with a perfect fit. Shipping was fast and packaging was nice.',
      helpful: 5,
    },
    {
      id: '4',
      user: 'Alex M.',
      rating: 5,
      date: 'August 9, 2023',
      comment:
        'Amazing quality, exceeded my expectations! The color is vibrant and the print is durable after several washes. Will buy again.',
      helpful: 8,
    },
    {
      id: '5',
      user: 'Olivia R.',
      rating: 4,
      date: 'August 8, 2023',
      comment:
        'Nice t-shirt, material retains color beautifully. T-shirt runs small so size up. Would love more color options in the future.',
      helpful: 6,
    },
    {
      id: '6',
      user: 'Ava H.',
      rating: 5,
      date: 'August 6, 2023',
      comment:
        'If you are looking for a great all-day option, this is it. The fit is comfortable and the design is simple but stylish.',
      helpful: 4,
    },
  ];

  const allThumbnails = product.images;

  return (
    <div className="w-full mx-auto px-28 py-8 bg-white">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {allThumbnails.map((img, idx) => (
              <button
                key={img}
                onClick={() => setMainImage(idx)}
                className={`border-2 rounded-lg overflow-hidden w-16 h-16 flex items-center justify-center bg-white transition-all duration-150 ${mainImage === idx ? 'border-[#1570EF]' : 'border-gray-200'}`}
                style={{ boxShadow: mainImage === idx ? '0 0 0 2px #1570EF' : undefined }}
              >
                <Image 
                  src={img} 
                  alt={`Product view ${idx + 1}`} 
                  width={64} 
                  height={64} 
                  className="object-cover"
                  onError={() => setImageError(true)}
                  onLoad={() => setIsLoading(false)}
                />
              </button>
            ))}
          </div>
          <div className="relative w-80 h-80 md:w-[350px] md:h-[350px] rounded-xl overflow-hidden bg-white flex items-center justify-center">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              </div>
            )}
            {imageError ? (
              <div className="text-red-500">Failed to load image</div>
            ) : (
              <Image 
                src={allThumbnails[mainImage]} 
                alt={product.name} 
                fill 
                className="object-contain"
                priority
                onError={() => setImageError(true)}
                onLoad={() => setIsLoading(false)}
              />
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col gap-2">
            <h1 className="w-[600px] h-[48px] top-[216px] left-[750px] font-integral font-bold text-[40px] leading-[100%] tracking-[0%] align-middle text-black">{product.name}</h1>
          
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-bold text-black">${product.salePrice}</span>
              <span className="text-xl text-gray-400 line-through">${product.price}</span>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">{product.discount}% OFF</span>
            </div>
            <p className="text-gray-600 text-sm mt-2 max-w-lg">{product.description}</p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-black">Color:</span>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={`${color.name}-${color.code}`}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${selectedColor === color.name ? 'border-black' : 'border-gray-200'}`}
                    style={{ backgroundColor: color.code }}
                  >
                    {selectedColor === color.name && color.name !== 'white' && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    )}
                    {selectedColor === color.name && color.name === 'white' && (
                      <span className="w-3 h-3 rounded-full bg-black block"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-black">Choose size:</span>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 rounded-full text-sm border transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'bg-[#F0F0F0] text-[#00000099] border-gray-200'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-gray-200 rounded-full px-2 py-1 bg-white">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 text-lg font-bold text-gray-500 hover:text-black"
              >
                -
              </button>
              <span className="px-3 text-base font-semibold text-black">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 text-lg font-bold text-gray-500 hover:text-black"
              >
                +
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="w-[179px] h-[52px] bg-black rounded-[62px] text-white font-bold text-base leading-[100%] tracking-[0%] font-['satoshi'] hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
           
          </div>
        </div>
      </div>

      <div className="mt-10 border-b border-gray-200">
        <nav className="flex justify-between">
          <button
            className={`py-3 px-1 text-base font-semibold border-b-2 transition-all ${activeTab === 'details' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
            onClick={() => setActiveTab('details')}
          >
            Product Details
          </button>
          <button
            className={`py-3 px-1 text-base font-semibold border-b-2 transition-all ${activeTab === 'reviews' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
            onClick={() => setActiveTab('reviews')}
          >
            Rating & Reviews
          </button>
          <button
            className={`py-3 px-1 text-base font-semibold border-b-2 transition-all ${activeTab === 'faq' ? 'border-black text-black' : 'border-transparent text-gray-400'}`}
            onClick={() => setActiveTab('faq')}
          >
            FAQs
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Overview</h2>
              <p className="text-gray-700 mb-6">This premium olive green graphic t-shirt features our signature "One Life" typography design on the chest. Crafted for comfort and style, this versatile piece makes a subtle statement while maintaining a timeless aesthetic.</p>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Price</h2>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-black">$280 USD</span>
                <span className="text-lg text-gray-400 line-through">$350</span>
                <span className="bg-red-50 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">20% Off</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Details</h2>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                <li>Regular fit</li>
                <li>100% organic cotton jersey</li>
                <li>Ribbed crewneck</li>
                <li>Short sleeves</li>
                <li>Front graphic print</li>
                <li>Reinforced shoulder seams</li>
                <li>Straight hem</li>
                <li>Machine washable</li>
              </ul>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Size & Fit</h2>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                <li>Model is 6'1" (185cm) and wears size M</li>
                <li>Regular fit, true to size</li>
                <li>Available in sizes XS, S, M, L, XL, XXL</li>
              </ul>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Material & Care</h2>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                <li>100% GOTS certified organic cotton</li>
                <li>220 gsm midweight jersey</li>
                <li>Garment dyed and pre-washed for softness</li>
                <li>Wash cold with similar colors</li>
                <li>Tumble dry low</li>
                <li>Do not bleach</li>
                <li>Cool iron on reverse if needed</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Colors Available</h2>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                <li>Olive Green (shown)</li>
                <li>Black</li>
                <li>Navy</li>
                <li>White</li>
              </ul>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sustainability</h2>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                <li>GOTS certified organic cotton</li>
                <li>Water-based, non-toxic dyes</li>
                <li>Fair Trade certified manufacturing</li>
                <li>Carbon-neutral shipping</li>
                <li>Recyclable packaging</li>
              </ul>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping & Returns</h2>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
                <li>Free standard shipping (3-5 business days)</li>
                <li>Express shipping available ($15)</li>
                <li>Free returns within 30 days</li>
                <li>See our full return policy for details</li>
              </ul>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Code</h2>
              <p className="text-gray-700">OLG-TS-OLV-2024</p>
            </div>
          </div>
        )}
        {activeTab === 'reviews' && (
          <ProductReviews
            reviews={reviews}
            averageRating={product.rating}
            totalReviews={product.reviewCount}
          />
        )}
        {activeTab === 'faq' && (
        <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Ordering & Payment</h3>
          <details className="mb-4 border-b border-gray-200 pb-4">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">How do I place an order?</summary>
            <p className="mt-2 text-gray-600">Browse our collection, select your desired product, choose the size and color, and click "Add to Cart." When you're ready to complete your purchase, proceed to checkout where you can enter your shipping information and payment details.</p>
          </details>
          <details className="mb-4 border-b border-gray-200 pb-4">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">What payment methods do you accept?</summary>
            <p className="mt-2 text-gray-600">We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are securely processed.</p>
          </details>
          <details className="mb-4 border-b border-gray-200 pb-4">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">Is my payment information secure?</summary>
            <p className="mt-2 text-gray-600">Yes, all payment information is encrypted and processed through secure payment gateways. We do not store your full credit card details on our servers.</p>
          </details>
         
        </div>
  
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping & Delivery</h3>
          <details className="mb-4 border-b border-gray-200 pb-4">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">How long will it take to receive my order?</summary>
            <ul className="mt-2 list-disc pl-5 space-y-2 text-gray-600">
              <li>Standard Shipping: 3-5 business days (free on all orders)</li>
              <li>Express Shipping: 1-2 business days ($15)</li>
              <li>International Shipping: 7-14 business days (varies by location)</li>
            </ul>
          </details>
          <details className="mb-4 border-b border-gray-200 pb-4">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">Do you ship internationally?</summary>
            <p className="mt-2 text-gray-600">Yes, we ship to over 90 countries worldwide. International shipping times and costs vary by location. Import duties and taxes may apply and are the responsibility of the customer.</p>
          </details>
          <details className="mb-4 border-b border-gray-200 pb-4">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">How can I track my order?</summary>
            <p className="mt-2 text-gray-600">Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account on our website.</p>
          </details>
        
        </div>
  
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Returns & Exchanges</h3>
          <details className="mb-4 border-b border-gray-200 pb-4">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">What is your return policy?</summary>
            <p className="mt-2 text-gray-600">We offer free returns within 30 days of delivery. Items must be unworn, unwashed, and with original tags attached. Return shipping is free for domestic orders.</p>
          </details>
          <details className="mb-4 border-b border-gray-200 pb-4">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">How do I initiate a return or exchange?</summary>
            <p className="mt-2 text-gray-600">Log into your account, go to "Order History," select the order containing the item you wish to return, and follow the return instructions. You'll receive a prepaid shipping label for domestic returns.</p>
          </details>
          <details className="mb-4 border-b border-gray-200 pb-4">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">How long does it take to process a return?</summary>
            <p className="mt-2 text-gray-600">Once we receive your return, it takes 3-5 business days to process. Refunds will be issued to your original payment method and may take an additional 3-5 business days to appear on your statement.</p>
          </details>
        
        </div>
  
      
  
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact & Support</h3>
          <details className="mb-4 border-b border-gray-200 pb-4">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">How can I contact customer service?</summary>
            <div className="mt-2 text-gray-600">
              <p>Our customer service team is available Monday through Friday, 9 AM - 6 PM EST. You can reach us via:</p>
              <ul className="mt-2 list-disc pl-5 space-y-2">
                <li>Email: support@onelifeclothing.com</li>
                <li>Live Chat: Available on our website during business hours</li>
                <li>Phone: 1-800-ONE-LIFE (1-800-663-5433)</li>
              </ul>
            </div>
          </details>
          <details className="mb-4 border-b border-gray-200 pb-4">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">Do you have physical stores?</summary>
            <p className="mt-2 text-gray-600">Currently, we operate exclusively online, but we host pop-up shops in major cities throughout the year. Sign up for our newsletter to stay informed about upcoming events.</p>
          </details>
          <details className="mb-4 border-b border-gray-200 pb-4">
            <summary className="font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">Do you offer wholesale opportunities?</summary>
            <p className="mt-2 text-gray-600">Yes, we offer wholesale opportunities for select retailers. Please contact wholesale@onelifeclothing.com for more information.</p>
          </details>
         
        </div>
      </div>
        )}
      </div>

      <div className="mt-20">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-8 tracking-tight">YOU MIGHT ALSO LIKE</h2>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}