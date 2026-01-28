import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  image: string;
}

const OnSaleProductCard = ({
  name,
  rating,
  reviews,
  currentPrice,
  originalPrice,
  discount,
  image,
}: Product) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full aspect-[3/4]">
        <Image
          src={image}
          alt={name}
          fill
          className="w-full h-full rounded-3xl bg-[#F0EEED] object-cover"
        />
        {discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
      </div>

      <div className="pt-4 ">
        <h3 className="text-black font-bold text-xl leading-none tracking-normal align-middle">{name}</h3>

        <div className="flex items-center">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-gray-500 text-sm">({reviews})</span>
        </div>

        <div className="flex items-center justify-center">
          <span className="text-black font-bold text-xl md:text-2xl leading-none tracking-normal">${currentPrice}</span>
          {originalPrice && (
            <span className="text-black/40 font-bold text-xl md:text-2xl leading-none tracking-normal line-through ml-2">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>  
    </div>
  );
};

export default function OnSalePage() {
  const onSaleProducts: Product[] = [
    {
      id: 1,
      name: 'Premium Cotton T-Shirt',
      rating: 4.5,
      reviews: 128,
      currentPrice: 29.99,
      originalPrice: 49.99,
      discount: 40,
      image: '/images/products/T-shirt03.png',
    },
    {
      id: 2,
      name: 'Slim Fit Chinos',
      rating: 4.8,
      reviews: 89,
      currentPrice: 59.99,
      originalPrice: 89.99,
      discount: 33,
      image: '/images/products/pent01.png',
    },
    {
      id: 3,
      name: 'Classic Oxford Shirt',
      rating: 4.6,
      reviews: 156,
      currentPrice: 44.99,
      originalPrice: 69.99,
      discount: 36,
      image: '/images/products/shirt06.png',
    },
    {
      id: 4,
      name: 'Denim Jacket',
      rating: 4.7,
      reviews: 203,
      currentPrice: 79.99,
      originalPrice: 119.99,
      discount: 33,
      image: '/images/products/shirt07.png',
    },
    {
      id: 5,
      name: 'Casual Hoodie',
      rating: 4.9,
      reviews: 267,
      currentPrice: 39.99,
      originalPrice: 64.99,
      discount: 38,
      image: '/images/products/T-shirt02.png',
    },
    {
      id: 6,
      name: 'Tailored Blazer',
      rating: 4.8,
      reviews: 94,
      currentPrice: 99.99,
      originalPrice: 159.99,
      discount: 38,
      image: '/images/products/shirt08.png',
    },
    {
      id: 7,
      name: 'Polo Shirt',
      rating: 4.4,
      reviews: 178,
      currentPrice: 34.99,
      originalPrice: 54.99,
      discount: 36,
      image: '/images/products/pent03.png',
    },
    {
      id: 8,
      name: 'Slim Fit Jeans',
      rating: 4.6,
      reviews: 234,
      currentPrice: 54.99,
      originalPrice: 84.99,
      discount: 35,
      image: '/images/products/pent02.png',
    },
  ];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {onSaleProducts.map((product) => (
              <OnSaleProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center">
            <nav className="flex items-center gap-2 flex-wrap justify-center">
              <button
                className="px-4 py-2 rounded-full border border-gray-300 text-black disabled:opacity-50 text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors"
                disabled={true}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Previous
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className="w-10 h-10 rounded-full border border-gray-300 text-black text-sm flex items-center justify-center bg-gray-200 font-medium"
                >
                  {p}
                </button>
              ))}
              <span className="text-black">...</span>
              {[8, 9, 10].map((p) => (
                <button
                  key={p}
                  className="w-10 h-10 rounded-full border border-gray-300 text-black text-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  {p}
                </button>
              ))}
              <button
                className="px-4 py-2 rounded-full border border-gray-300 text-black text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                Next
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
