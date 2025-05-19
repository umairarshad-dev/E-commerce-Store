import NewArrivals from './components/NewArrivals';
import TopSelling from './components/TopSelling';
import DressStyle from './components/DressStyle';
import Reviews from './components/Reviews';


export default function HeroSection() {
  return (
    <>
      <div className="relative w-full flex justify-center items-center min-h-screen bg-[#F2F0F1] bg-cover bg-center"
        style={{ backgroundImage: `url('/hero img.png')` }}
      >
         <img
          src="/black-star.png"
          alt="star"
          className="absolute top-6 right-6 w-[32px] h-[32px] lg:top-10 lg:right-24 lg:w-[104px] lg:h-[104px]"
        />
        <img
          src="/black-star.png"
          alt="black-star"
          className="absolute hidden lg:block top-1/2 left-[45%] w-[56px] h-[56px]"
        />

         <div className="w-full flex justify-center items-center px-4 lg:px-24 pt-16 lg:pt-32">
          <div className="container mx-auto lg:mx-0">
            <h1 className="font-['Integral_CF'] font-bold text-[32px] leading-[38px] lg:text-[64px] lg:leading-[76px] tracking-normal text-left text-black mb-4 lg:mb-6">
              FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLE
            </h1>

            <p className="font-integralCF text-sm lg:text-base leading-[21px] lg:leading-[24px] text-black/60 text-left mb-8">
              Browse through our diverse range of meticulously crafted garments,<br/> designed to bring out your individuality and cater to your sense of style.
            </p>

            <button className="font-['Integral_CF'] w-[132px] h-[48px] lg:w-[210px] lg:h-[52px] text-white text-sm lg:text-base rounded-[62px] font-medium bg-black hover:bg-black/90 transition-colors mb-12 lg:mb-16">
              Shop Now
            </button>

             <div className="flex space-x-6 lg:space-x-12">
          <div className="text-left">
            <h2 className="font-bold text-2xl lg:text-4xl leading-tight text-black mb-0">200+</h2>
            <p className="text-xs lg:text-sm text-gray-600">International Brands</p>
          </div>
          <div className="text-left">
            <h2 className="font-bold text-2xl lg:text-4xl leading-tight text-black mb-0">2,000+</h2>
            <p className="text-xs lg:text-sm text-gray-600">High-Quality Products</p>
          </div>
          <div className="text-left">
            <h2 className="font-bold text-2xl lg:text-4xl leading-tight text-black mb-0">30,000+</h2>
            <p className="text-xs lg:text-sm text-gray-600">Happy Customers</p>
          </div>
        </div>
          </div>
        </div>

        {/* Fixed bottom brand section */}
        <div className="absolute bottom-0 left-0 right-0 bg-black w-full">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-26 px-4 md:px-12 lg:px-24 py-6 md:py-8 lg:py-4">
            <img 
              src="/versace-collection.png" 
              alt="versace" 
              className="w-[100px] h-auto md:w-[130px] lg:w-[166.48px]" 
            />
            <img 
              src="/zara-collection.png" 
              alt="zara" 
              className="w-[60px] h-auto md:w-[75px] lg:w-[91px]" 
            />
            <img 
              src="/gucci-collection.png" 
              alt="Gucci" 
              className="w-[100px] h-auto md:w-[130px] lg:w-[156px]" 
            />
            <img 
              src="/prada-collection.png" 
              alt="prada-collection" 
              className="w-[120px] h-auto md:w-[160px] lg:w-[194px]" 
            />
            <img 
              src="/calvin-collection.png" 
              alt="calvin-collection" 
              className="w-[130px] h-auto md:w-[170px] lg:w-[206.79px]" 
            />
          </div>
        </div>
      </div>

      <NewArrivals />
      <TopSelling />
      <DressStyle />
      <Reviews />
    </>
  );
}