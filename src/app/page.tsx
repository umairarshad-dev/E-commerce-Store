import NewArrivals from './components/NewArrivals';
import TopSelling from './components/TopSelling';
import DressStyle from './components/DressStyle';
import Reviews from './components/Reviews';

export default function HeroSection() {
  return (
    <>
      <div className="relative w-full flex justify-center items-center min-h-[600px] sm:min-h-screen bg-[#F2F0F1]"
        style={{ 
          backgroundImage: `url('/hero img.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Mobile overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/20 sm:bg-transparent"></div>
        
        {/* Decorative stars */}
        <img
          src="/images/ui/black-star.png"
          alt="star"
          className="absolute top-6 right-6 w-6 h-6 sm:w-8 sm:h-8 lg:top-10 lg:right-24 lg:w-[104px] lg:h-[104px]"
        />
        <img
          src="/images/ui/black-star.png"
          alt="black-star"
          className="absolute hidden lg:block top-1/2 left-[45%] w-14 h-14"
        />

        {/* Main content */}
        <div className="w-full flex justify-center items-center px-4 sm:px-8 lg:px-24 pt-16 lg:pt-32 pb-40 lg:pb-48 relative z-10">
          <div className="container mx-auto lg:mx-0 max-w-[588px]">
            <h1 className="font-['Integral_CF'] font-bold text-[24px] sm:text-[32px] leading-[28px] sm:leading-[38px] lg:text-[64px] lg:leading-[76px] tracking-normal text-left text-white sm:text-black mb-4 lg:mb-6 drop-shadow-lg sm:drop-shadow-none">
              FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLE
            </h1>

            <p className="font-['Satoshi'] text-xs sm:text-sm lg:text-base leading-[16px] sm:leading-[21px] lg:leading-[24px] text-white/90 sm:text-black/60 text-left mb-6 lg:mb-12 drop-shadow-md sm:drop-shadow-none">
              Browse through our diverse range of meticulously crafted garments,<br className="hidden sm:block" /> designed to bring out your individuality and cater to your sense of style.
            </p>

            <button className="font-['Integral_CF'] w-[120px] h-[44px] sm:w-[132px] sm:h-[48px] lg:w-[210px] lg:h-[52px] text-white text-sm sm:text-base lg:text-base rounded-[62px] font-medium bg-black hover:bg-black/90 transition-colors mb-8 lg:mb-16 shadow-lg">
              Shop Now
            </button>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-8 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[520px]">
              <div className="text-left">
                <h2 className="font-['Satoshi'] font-bold text-[20px] sm:text-[28px] lg:text-[40px] leading-[24px] sm:leading-[34px] lg:leading-[48px] text-white sm:text-black mb-1 drop-shadow-md sm:drop-shadow-none">200+</h2>
                <p className="font-['Satoshi'] text-[10px] sm:text-[11px] lg:text-[14px] leading-[12px] sm:leading-[14px] lg:leading-[18px] text-white/80 sm:text-black/60 tracking-[0.01em]">
                  International Brands
                </p>
              </div>
              <div className="text-left">
                <h2 className="font-['Satoshi'] font-bold text-[20px] sm:text-[28px] lg:text-[40px] leading-[24px] sm:leading-[34px] lg:leading-[48px] text-white sm:text-black mb-1 drop-shadow-md sm:drop-shadow-none">2,000+</h2>
                <p className="font-['Satoshi'] text-[10px] sm:text-[11px] lg:text-[14px] leading-[12px] sm:leading-[14px] lg:leading-[18px] text-white/80 sm:text-black/60 tracking-[0.01em]">
                  High-Quality Products
                </p>
              </div>
              <div className="text-left">
                <h2 className="font-['Satoshi'] font-bold text-[20px] sm:text-[28px] lg:text-[40px] leading-[24px] sm:leading-[34px] lg:leading-[48px] text-white sm:text-black mb-1 drop-shadow-md sm:drop-shadow-none">30,000+</h2>
                <p className="font-['Satoshi'] text-[10px] sm:text-[11px] lg:text-[14px] leading-[12px] sm:leading-[14px] lg:leading-[18px] text-white/80 sm:text-black/60 tracking-[0.01em]">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black w-full h-[100px] sm:h-[122px] flex justify-center items-center px-4">
          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 lg:gap-12 flex-wrap">
            <img
              src="/images/brands/versace-collection.png"
              alt="Versace"
              className="h-[16px] sm:h-[20px] lg:h-[24px] w-auto object-contain filter brightness-0 invert"
            />
            <img
              src="/images/brands/zara-collection.png"
              alt="Zara"
              className="h-[16px] sm:h-[20px] lg:h-[26px] w-auto object-contain filter brightness-0 invert"
            />
            <img
              src="/images/brands/gucci-collection.png"
              alt="Gucci"
              className="h-[16px] sm:h-[20px] lg:h-[25px] w-auto object-contain filter brightness-0 invert"
            />
            <img
              src="/images/brands/prada-collection.png"
              alt="Prada"
              className="h-[14px] sm:h-[18px] lg:h-[22px] w-auto object-contain filter brightness-0 invert"
            />
            <img
              src="/images/brands/calvin-collection.png"
              alt="Calvin Klein"
              className="h-[16px] sm:h-[20px] lg:h-[24px] w-auto object-contain filter brightness-0 invert"
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