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
          <span className="text-black font-bold text-xl md:text-2xl leading-none tracking-normal">PKR {currentPrice}</span>
          {originalPrice && (
            <span className="text-black/40 font-bold text-xl md:text-2xl leading-none tracking-normal line-through ml-2">
              PKR {originalPrice}
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
      currentPrice: 7999,
      originalPrice: 8999,
      image: '/images/ecommerce-assets/shirt03.png',
    },
    {
      id: 2,
      name: 'COURAGE GRAPHIC T-SHIRT',
      rating: 3.5,
      reviews: 3,
      currentPrice: 5999,
      image: '/images/ecommerce-assets/shirt04.png',
    },
    {
      id: 3,
      name: 'FIT BERMUDA SHORTS',
      rating: 4.5,
      reviews: 4,
      currentPrice: 3999,
      image: '/images/ecommerce-assets/pent03.png',
    },
    {
      id: 4,
      name: 'FADED SKINNY JEANS',
      rating: 4.5,
      reviews: 4.5,
      currentPrice: 6999,
      image: '/images/ecommerce-assets/product-06.jpg',
    },
  ];

  return (
    <div className="w-full bg-white">
      <div className="px-8 py-7">
        <div className="max-w-screen-xl mx-auto">
          <div className="font-['Integral CF'] font-bold text-4xl md:text-5xl text-black mb-8 text-center">
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