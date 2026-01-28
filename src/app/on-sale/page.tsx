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

      <div className="pt-4 w-full">
        <h3 className="text-black font-bold text-lg md:text-xl leading-none tracking-normal line-clamp-2">{name}</h3>
        <div className="flex items-center mt-1">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-gray-500 text-sm">({reviews})</span>
        </div>
        <div className="mt-2">
          <span className="pr-2 text-black font-bold text-xl md:text-2xl leading-none">${currentPrice}</span>
          {originalPrice && (
            <span className="text-black/40 font-bold text-xl md:text-2xl leading-none line-through">
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
      name: 'Gradient Graphic T-shirt',
      rating: 4.0,
      reviews: 5,
      currentPrice: 145,
      originalPrice: 180,
      discount: 20,
      image: '/T-shirt02.png',
    },
    {
      id: 2,
      name: 'Polo Ralph Lauren',
      rating: 4.5,
      reviews: 8,
      currentPrice: 120,
      originalPrice: 150,
      discount: 20,
      image: '/T-shirt03.png',
    },
    {
      id: 3,
      name: 'Striped Summer Shirt',
      rating: 3.5,
      reviews: 3,
      currentPrice: 80,
      originalPrice: 100,
      discount: 20,
      image: '/shirt01.png',
    },
    {
      id: 4,
      name: 'Classic Denim Jeans',
      rating: 4.5,
      reviews: 12,
      currentPrice: 90,
      originalPrice: 120,
      discount: 25,
      image: '/pent02.png',
    },
    {
      id: 5,
      name: 'Vintage Hoodie',
      rating: 5.0,
      reviews: 15,
      currentPrice: 60,
      originalPrice: 80,
      discount: 25,
      image: '/shirt04.png',
    },
    {
      id: 6,
      name: 'Sports Shorts',
      rating: 4.0,
      reviews: 6,
      currentPrice: 45,
      originalPrice: 60,
      discount: 25,
      image: '/pent01.png',
    },
    {
      id: 7,
      name: 'Casual T-Shirt',
      rating: 3.0,
      reviews: 2,
      currentPrice: 35,
      originalPrice: 50,
      discount: 30,
      image: '/T-shite01.png',
    },
    {
      id: 8,
      name: 'Designer Jacket',
      rating: 4.5,
      reviews: 10,
      currentPrice: 180,
      originalPrice: 250,
      discount: 28,
      image: '/shirt05.png',
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
