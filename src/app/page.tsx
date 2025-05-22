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
              Browse through our diverse range of meticulously crafted garments, <br/>designed to bring out your individuality and cater to your sense of style.
            </p>

            <button className="font-['Integral_CF'] w-[132px] h-[48px] lg:w-[210px] lg:h-[52px] text-white text-sm lg:text-base rounded-[62px] font-medium bg-black hover:bg-black/90 transition-colors mb-12 lg:mb-16">
              Shop Now
            </button>

            <div className="grid grid-cols-3 gap-4 lg:gap-[36px]">
              <div className="text-left">
                <h2 className="font-satoshi font-bold text-2xl lg:text-[40px] leading-tight text-black mb-1">200+</h2>
                <p className="font-satoshi text-xs lg:text-base text-black/60">International Brands</p>
              </div>
              <div className="text-left">
                <h2 className="font-satoshi font-bold text-2xl lg:text-[40px] leading-tight text-black mb-1">2,000+</h2>
                <p className="font-satoshi text-xs lg:text-base text-black/60">High-Quality Products</p>
              </div>
              <div className="text-left">
                <h2 className="font-satoshi font-bold text-2xl lg:text-[40px] leading-tight text-black mb-1">30,000+</h2>
                <p className="font-satoshi text-xs lg:text-base text-black/60">Happy Customers</p>
              </div>
            </div>
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

        <div className="absolute bottom-0 left-0 right-0 bg-black w-full lg:h-[122px] h-auto py-4 lg:py-0 flex flex-col lg:flex-row justify-center items-center lg:px-24 gap-y-4 lg:gap-26">
          {/* Top row - VERSACE ZVR GUCCI */}
          <div className="flex flex-row items-center justify-center gap-8 lg:gap-26">
            <img
              src="/versace-collection.png"
              alt="Versace"
              className="w-[100px] lg:w-[166.48px] h-[20px] lg:h-[33.16px]"
            />
            <img
              src="/zara-collection.png"
              alt="Zara"
              className="w-[50px] lg:w-[91px] h-[20px] lg:h-[38px]"
            />
            <img
              src="/gucci-collection.png"
              alt="Gucci"
              className="w-[80px] lg:w-[156px] h-[20px] lg:h-[36px]"
            />
          </div>

          {/* Bottom row - PRADA Calvin Klein */}
          <div className="flex flex-row items-center justify-center gap-8 lg:gap-26">
            <img
              src="/prada-collection.png"
              alt="Prada"
              className="w-[120px] lg:w-[194px] h-[18px] lg:h-[31px]"
            />
            <img
              src="/calvin-collection.png"
              alt="Calvin Klein"
              className="w-[130px] lg:w-[206.79px] h-[20px] lg:h-[33px]"
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