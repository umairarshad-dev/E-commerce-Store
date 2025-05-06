import NewArrivals from './components/NewArrivals';
import TopSelling from './components/TopSelling';
import DressStyle from './components/DressStyle';
import Reviews from './components/Reviews';


export default function HeroSection() {
  return (
    <>
      <div className="relative h-[fit-content] w-full px-8 py-7 bg-cover bg-center"
        style={{ backgroundImage: `url('/hero img.png')` }}
      >
        <img
          src="/black-star.png"
          alt="star"
          className="absolute top-22 right-22 w-[104px] h-[104px]"
        />
        <img
          src="/black-star.png"
          alt="black-star"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[56px] h-[56px] top-"
        />

        <div className="w-[577px] h-[663px] top-[237px] left-[100px] flex flex-col gap-8 pt-12 pl-16 justify-start">
          <h1 className="font-['Integral_CF'] font-bold text-[64px] leading-[64px] tracking-normal align-middle text-[#000000]">
            FIND CLOTHES <br /> THAT MATCHES<br /> YOUR STYLE
          </h1>

          <div className="w-[545px] h-[33px] top-[442px] left-[100px]">
            <p className="font-integralCF font-normal text-base leading-[22px] tracking-normal text-[#00000099] mb-10 max-img-2xl mx-auto">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
          </div>

          <button className="font-['Integral_CF'] w-[210px] h-[52px] text-white pt-[14px] pr-[54px] pb-[22px] pl-[54px] rounded-[62px] font-medium bg-[#000000]">
            Shop Now
          </button>

          <div className="flex w-[596px] h-[74px] top-[607px] left-[100px] gap-[36px]">
            <div className="w-[141px] h-[74px]">
              <h2 className="w-[107px] h-[42px] font-satoshi font-bold text-[40px] leading-[100%] tracking-[0%] align-middle text-[#000000]">200+</h2>
              <p className="w-[144px] h-[22px] font-satoshi font-normal text-[16px] leading-[22px] tracking-[0%] text-[#00000099]">International Brands</p>
            </div>
            <div className="w-[156px] h-[74px]">
              <h2 className="w-[146px] h-[42px] font-satoshi font-bold text-[40px] leading-none tracking-normal align-middle text-black relative">
                2,000+
              </h2>
              <p className="w-[156px] h-[22px] font-satoshi font-normal text-base leading-[22px] tracking-normal text-black/60">High-Quality Products</p>
            </div>
            <div className="w-[171px] h-[74px]">
              <h2 className="w-[171px] h-[42px] font-satoshi font-bold text-[40px] leading-[100%] tracking-[0%] align-middle text-[#000000]">30,000+</h2>
              <p className="w-[140px] h-[22px] font-satoshi font-normal text-[16px] leading-[22px] tracking-[0%] text-[#00000099]">Happy Customers</p>
            </div>
          </div>
        </div>


        <div className="absolute  bottom-0 left-0 right-0 bg-black w-full h-[122px]  flex justify-between items-center px-24 py-4">
          <img src="/versace.png" alt="Versace" className=" w-[166.48px] h-[33.16px] top-841px left-100px " />
          <img src="/zara.png" alt="zara" className="w-[91px] h-[38px] top-839px left-372.48px " />
          <img src="/gucci.png" alt="Gucci" className="w-[156px] h-[36px] top-840px left-569.48px" />
          <img src="/prada.png" alt="prada" className="w-[194px] h-[31px] top-0.4px border-1.02px" />
          <img src="/calvin.png" alt="calvin" className="w-[206.79px] h-[33px] top-841px left-1131.48px" />
        </div>
      </div>
      <NewArrivals />
      <TopSelling />
      <DressStyle />
      <Reviews/>
    </>
  );
}