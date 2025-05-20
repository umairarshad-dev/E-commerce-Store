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
          className="w-65 h-100 rounded-3xl bg-[#F0EEED] object-cover"
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
      image: '/shoe-01.jpg',
    },
    {
      id: 2,
      name: 'COURAGE GRAPHIC T-SHIRT',
      rating: 3.5,
      reviews: 3,
      currentPrice: 145,
      image: '/shoe-02.jpg',
    },
    {
      id: 3,
      name: 'FIT BERMUDA SHORTS',
      rating: 4.5,
      reviews: 4,
      currentPrice: 80,
      image: '/shoe-03.jpg',
    },
    {
      id: 4,
      name: 'FADED SKINNY JEANS',
      rating: 4.5,
      reviews: 4.5,
      currentPrice: 210,
      image: '/shoe-04.jpg',
    },
  ];

  return (
    <div className="relative w-full flex justify-center items-center bg-white">
      <div className="w-full flex justify-center items-center px-4 lg:px-24">
        <div className="container mx-auto lg:mx-0">
          <div className="font-['Integral CF'] text-center font-bold text-[32px] leading-[38px] lg:text-[64px] lg:leading-[76px] tracking-normal text-black px-4 py-16">
            New Arrival
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-[36px]">
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