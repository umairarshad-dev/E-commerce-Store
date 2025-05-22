export default function Footer() {
  return (
    <div className="relative">
      <div className="absolute -top-1/5 left-0 right-0 flex justify-center">
        <div className="bg-black text-white py-6 sm:py-8 px-4 w-full max-w-[1320px] h-auto sm:h-[180px] rounded-[20px] mx-4">
          <div className="flex flex-col sm:flex-row justify-between items-center h-full px-4 sm:px-8 gap-6 sm:gap-0">
            <div className="text-center sm:text-left">
              <h2 className="font-bold text-xl sm:text-2xl md:text-[40px] leading-tight tracking-normal text-white">
                STAY UPTO DATE ABOUT<br />
                OUR LATEST OFFERS
              </h2>
            </div>
            <div className="w-full sm:w-auto flex flex-col min-w-[280px]">
              <div className="flex flex-col w-full sm:w-[400px] gap-3">
                <div className="relative w-full h-[48px] rounded-[62px] bg-white">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full h-full px-4 py-3 rounded-full text-[#00000066] font-['satoshi'] font-normal text-sm sm:text-base leading-none tracking-normal pl-10 focus:outline-none"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 3L8.8906 8.2604C8.9518 8.3006 9.0482 8.3006 9.1094 8.2604L17 3" stroke="#666666" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="0.5" y="0.5" width="17" height="13" rx="1.5" stroke="#666666" />
                    </svg>
                  </div>
                </div>
                <button className="w-full h-[46px] rounded-[62px] bg-white text-black font-medium text-sm sm:text-base hover:bg-gray-100 transition-colors">
                  Subscribe to Newsletter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-[#F0F0F0] text-[#000000] border-t border-[#EAEAEA] pt-[100px]">
        <div className="px-4 sm:px-6 py-8">
          <div className="flex justify-center">
            <div className="w-[1320px] flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between mb-12 gap-8 sm:gap-4">
                <div className="w-full sm:w-[248px] flex flex-col gap-4 sm:gap-[25px]">
                  <div className="font-bold text-2xl sm:text-[32px] leading-none tracking-[0%] font-['Integral_CF']">
                    SHOP.CO
                  </div>
                  <p className="text-[#000000] opacity-60 font-['Satoshi'] font-normal text-sm sm:text-[14px] leading-[22px]">
                    We have clothes that suit your style and which you're proud to wear. From women to men.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-[28px] h-[28px] flex items-center justify-center rounded-full border border-[#00000033] bg-white hover:bg-black transition-colors duration-200 group">
                      <img
                        src="/twitter.png"
                        alt="Twitter"
                        className="w-[11px] h-[9px] group-hover:filter group-hover:brightness-0 group-hover:invert transition-all duration-200"
                      />
                    </div>

                    <div className="w-[28px] h-[28px] flex items-center justify-center rounded-full border border-[#00000033] bg-black hover:bg-white transition-colors duration-200 group">
                      <img
                        src="/facebook.png"
                        alt="Facebook"
                        className="w-[6.32px] h-[12.17px] filter brightness-0 invert group-hover:filter-none group-hover:brightness-100 group-hover:invert-0 transition-all duration-200"
                      />
                    </div>

                    <div className="w-[28px] h-[28px] flex items-center justify-center rounded-full border border-[#00000033] bg-white hover:bg-black transition-colors duration-200 group">
                      <img
                        src="/instagram.png"
                        alt="Instagram"
                        className="w-[13.55px] h-[9px] group-hover:filter group-hover:brightness-0 group-hover:invert transition-all duration-200"
                      />
                    </div>

                    <div className="w-[28px] h-[28px] flex items-center justify-center rounded-full border border-[#00000033] bg-white hover:bg-black transition-colors duration-200 group">
                      <img
                        src="/github.png"
                        alt="GitHub"
                        className="w-[12.96px] h-[12.65px] group-hover:filter group-hover:brightness-0 group-hover:invert transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 xs:grid-cols-3 sm:flex sm:flex-wrap justify-between gap-6 sm:gap-4 w-full sm:w-[800px]">
                  <div className="min-w-[120px] sm:w-[160px]">
                    <h3 className="font-medium text-sm sm:text-[16px] leading-[18px] tracking-[3px] uppercase font-satoshi mb-4">Company</h3>
                    <ul className="space-y-3 font-[Satoshi] font-normal text-sm sm:text-[16px]">
                      {['About', 'Features', 'Works', 'Career'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-[#666] hover:text-black transition-colors">{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="min-w-[120px] sm:w-[160px]">
                    <h3 className="font-medium text-sm sm:text-[16px] leading-[18px] tracking-[3px] uppercase font-satoshi mb-4">HELP</h3>
                    <ul className="space-y-3 font-[Satoshi] font-normal text-sm sm:text-[16px]">
                      {['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-[#666] hover:text-black transition-colors">{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="min-w-[120px] sm:w-[160px]">
                    <h3 className="font-medium text-sm sm:text-[16px] leading-[18px] tracking-[3px] uppercase font-satoshi mb-4">FAQ</h3>
                    <ul className="space-y-3 font-[Satoshi] font-normal text-sm sm:text-[16px]">
                      {['Account', 'Manage Deliveries', 'Orders', 'Payments'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-[#666] hover:text-black transition-colors">{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="min-w-[120px] sm:w-[160px]">
                    <h3 className="font-medium text-sm sm:text-[16px] leading-[18px] tracking-[3px] uppercase font-satoshi mb-4">Resources</h3>
                    <ul className="space-y-3 font-[Satoshi] font-normal text-sm sm:text-[16px]">
                      {['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'].map((item) => (
                        <li key={item}>
                          <a href="#" className="text-[#666] hover:text-black transition-colors">{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-6 pb-4 gap-4 sm:gap-0">
                <div>
                  <p className="text-[#666] font-normal text-sm">
                    Shop.co © 2000-2023, All Rights Reserved
                  </p>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4">
                  {['visa-card', 'master-card', 'paypal-card', 'apple-pay', 'googlepay-card'].map((brand) => (
                    <div key={brand} className="w-[46px] h-[30px] rounded-[5px] border border-[#D6DCE5] bg-white flex items-center justify-center">
                      <img
                         alt={brand}
                        className="object-contain p-1 max-h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}