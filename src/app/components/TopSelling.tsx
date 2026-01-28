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

const ProductCard = ({
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
        <img
          src={image}
          alt={name}
          className="w-full h-full rounded-3xl bg-[#F0EEED] object-cover"
        />
        {discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
      </div>

      <div className="pt-4 w-full">
        <h3 className="text-black font-bold text-lg sm:text-xl leading-none tracking-normal align-middle">{name}</h3>

        <div className="flex items-center mt-2">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-sm sm:text-base">
                {i < Math.floor(rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-gray-500 text-xs sm:text-sm">({reviews})</span>
        </div>

        <div className="mt-2">
          <span className="pr-2 text-black font-sans font-bold text-xl sm:text-2xl leading-none tracking-normal align-middle">${currentPrice}</span>
          {originalPrice && (
            <span className="text-black/40 font-bold text-xl sm:text-2xl leading-none tracking-normal align-middle line-through">
              ${originalPrice}
            </span>
          )}
        </div>
      </div>  
    </div>
  );
};

export default function TopSelling() {
  const products: Product[] = [
    {
      id: 1,
      name: 'VERTICAL STRIPED SHIRT',
      rating: 4.5,
      reviews: 4,
      currentPrice: 212,
      originalPrice: 232,
      image: '/shirt04.png',
    },
    {
      id: 2,
      name: 'COURAGE GRAPHIC T-SHIRT',
      rating: 3.5,
      reviews: 3,
      currentPrice: 145,
      image: '/shirt05.png',
    },
    {
      id: 3,
      name: 'FIT BERMUDA SHORTS',
      rating: 4.5,
      reviews: 4,
      currentPrice: 80,
      image: '/pent02.png',
    },
    {
      id: 4,
      name: 'FADED SKINNY JEANS',
      rating: 4.5,
      reviews: 4.5,
      currentPrice: 210,
      image: '/shirt02.png',
    },
  ];

  return (
    <div className="w-full bg-white">
      <div className="px-8 py-7">
        <div className="max-w-screen-xl mx-auto">
          <div className="font-['Integral CF'] font-bold text-4xl md:text-5xl text-black mb-8">
            Top Selling
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button className="w-[132px] h-[48px] lg:w-[218px] lg:h-[52px] rounded-full py-4 px-8 border border-black/10 font-sans font-medium text-sm sm:text-base leading-none tracking-normal text-black hover:bg-gray-50 transition-colors">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}