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
        {/* Decorative stars */}
        <img
          src="/black-star.png"
          alt="star"
          className="absolute top-6 right-6 w-8 h-8 lg:top-10 lg:right-24 lg:w-[104px] lg:h-[104px]"
        />
        <img
          src="/black-star.png"
          alt="black-star"
          className="absolute hidden lg:block top-1/2 left-[45%] w-14 h-14"
        />

        {/* Main content */}
        <div className="w-full flex justify-center items-center px-4 lg:px-24 pt-16 lg:pt-32 pb-40 lg:pb-48">
          <div className="container mx-auto lg:mx-0 max-w-[588px]">
            <h1 className="font-['Integral_CF'] font-bold text-[32px] leading-[38px] lg:text-[64px] lg:leading-[76px] tracking-normal text-left text-black mb-4 lg:mb-6">
              FIND CLOTHES<br />THAT MATCHES<br />YOUR STYLE
            </h1>

            <p className="font-['Satoshi'] text-sm lg:text-base leading-[21px] lg:leading-[24px] text-black/60 text-left mb-8 lg:mb-12">
              Browse through our diverse range of meticulously crafted garments,<br /> designed to bring out your individuality and cater to your sense of style.
            </p>

            <button className="font-['Integral_CF'] w-[132px] h-[48px] lg:w-[210px] lg:h-[52px] text-white text-sm lg:text-base rounded-[62px] font-medium bg-black hover:bg-black/90 transition-colors mb-12 lg:mb-16">
              Shop Now
            </button>

            <div className="grid grid-cols-3 gap-4 lg:gap-8 w-full max-w-[400px] lg:max-w-[520px]">
              <div className="text-left">
                <h2 className="font-['Satoshi'] font-bold text-[28px] lg:text-[40px] leading-[34px] lg:leading-[48px] text-black mb-1">200+</h2>
                <p className="font-['Satoshi'] text-[11px] lg:text-[14px] leading-[14px] lg:leading-[18px] text-black/60 tracking-[0.01em]">
                  International Brands
                </p>
              </div>
              <div className="text-left">
                <h2 className="font-['Satoshi'] font-bold text-[28px] lg:text-[40px] leading-[34px] lg:leading-[48px] text-black mb-1">2,000+</h2>
                <p className="font-['Satoshi'] text-[11px] lg:text-[14px] leading-[14px] lg:leading-[18px] text-black/60 tracking-[0.01em]">
                  High-Quality Products
                </p>
              </div>
              <div className="text-left">
                <h2 className="font-['Satoshi'] font-bold text-[28px] lg:text-[40px] leading-[34px] lg:leading-[48px] text-black mb-1">30,000+</h2>
                <p className="font-['Satoshi'] text-[11px] lg:text-[14px] leading-[14px] lg:leading-[18px] text-black/60 tracking-[0.01em]">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black w-full h-[122px] flex justify-center items-center px-4">
          <div className="flex flex-row items-center justify-center gap-4 lg:gap-12 flex-wrap">
            <img
              src="/versace-collection.png"
              alt="Versace"
              className="h-[20px] lg:h-[24px] w-auto object-contain"
            />
            <img
              src="/zna-collection.png"
              alt="ZNA"
              className="h-[20px] lg:h-[26px] w-auto object-contain"
            />
            <img
              src="/gucci-collection.png"
              alt="Gucci"
              className="h-[20px] lg:h-[25px] w-auto object-contain"
            />
            <img
              src="/prada-collection.png"
              alt="Prada"
              className="h-[18px] lg:h-[22px] w-auto object-contain"
            />
            <img
              src="/calvin-collection.png"
              alt="Calvin Klein"
              className="h-[20px] lg:h-[24px] w-auto object-contain"
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