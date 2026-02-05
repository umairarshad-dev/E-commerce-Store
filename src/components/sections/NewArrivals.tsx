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

export default function NewArrivals() {
  const products: Product[] = [
    {
      id: 1,
      name: 'Modern Striped Shirt',
      rating: 4.5,
      reviews: 124,
      currentPrice: 4999,
      originalPrice: 6999,
      discount: 29,
      image: '/images/ecommerce-assets/shirt01.png',
    },
    {
      id: 2,
      name: 'Graphic Print T-Shirt',
      rating: 4.2,
      reviews: 89,
      currentPrice: 2999,
      originalPrice: 3999,
      discount: 25,
      image: '/images/ecommerce-assets/shirt02.png',
    },
    {
      id: 3,
      name: 'Premium Shorts',
      rating: 4.7,
      reviews: 156,
      currentPrice: 3499,
      originalPrice: 4999,
      discount: 30,
      image: '/images/ecommerce-assets/pent01.png',
    },
    {
      id: 4,
      name: 'Slim Fit Denim',
      rating: 4.6,
      reviews: 203,
      currentPrice: 5999,
      originalPrice: 8499,
      discount: 29,
      image: '/images/ecommerce-assets/pent02.png',
    },
  ];

  return (
    <div className="w-full bg-white">
      <div className="px-8 py-7">
        <div className="max-w-screen-xl mx-auto">
          <div className="font-['Integral CF'] font-bold text-4xl md:text-5xl text-black mb-8 text-center">
            New Arrival
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
            <button className="w-[132px] h-[48px] lg:w-[218px] lg:h-[52px] rounded-full py-4 px-8 border border-black/10 font-sans font-medium text-base leading-none tracking-normal text-black">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}