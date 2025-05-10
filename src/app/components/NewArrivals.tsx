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
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={260}
          height={272}
          className="w-65 h-68 rounded-3xl bg-[#F0EEED] object-cover"
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

        <div className="w-52 h-8 top-[1480px] left-[415px] ">
          <span className="pr-2 text-black  font-sans font-bold text-2xl leading-none tracking-normal align-middle">${currentPrice}</span>
          {originalPrice && (
            <span className="text-black/40  font-bold text-2xl leading-none tracking-normal align-middle line-through">
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
      image: '/shirt01.png',
    },
    {
      id: 2,
      name: 'COURAGE GRAPHIC T-SHIRT',
      rating: 3.5,
      reviews: 3,
      currentPrice: 145,
      image: '/pent01.png',
    },
    {
      id: 3,
      name: 'FIT BERMUDA SHORTS',
      rating: 4.5,
      reviews: 4,
      currentPrice: 80,
      image: '/shirt02.png',
    },
    {
      id: 4,
      name: 'FADED SKINNY JEANS',
      rating: 4.5,
      reviews: 4.5,
      currentPrice: 210,
      image: '/shirt03.png',
    },
  ];

  return (
    <div className="w-full mx-auto px-8 py-7 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-center">
          <div className="font-['Integral CF'] font-bold text-center mb-8 text-[48px] leading-[100%] tracking-[0%] text-black">New Arrival</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button className="w-[218px] h-[52px] rounded-full py-4 px-14 border border-black/10 font-sans font-medium text-base leading-none tracking-normal text-black gap-3">
            View All
          </button>
        </div>
      </div>
    </div>
  );
}