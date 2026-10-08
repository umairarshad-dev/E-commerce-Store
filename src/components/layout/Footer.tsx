export default function Footer() {
  return (
    <div className="relative">
      {/* Main Footer */}
      <footer className="bg-[#F0F0F0] text-[#000000] border-t border-[#EAEAEA] pt-0">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center">
            <div className="w-full max-w-7xl flex flex-col">
              <div className="flex flex-col lg:flex-row justify-between mb-12 gap-8 lg:gap-4">
                <div className="w-full lg:w-[248px] flex flex-col gap-4 sm:gap-[25px]">
                  <div className="font-bold text-2xl sm:text-[32px] leading-none tracking-[0%] font-['Integral_CF']">
                    SHOP.CO
                  </div>
                  <p className="text-[#000000] opacity-60 font-['Satoshi'] font-normal text-sm sm:text-[14px] leading-[22px]">
                    We have clothes that suit your style and which you're proud to wear. From women to men.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-[28px] h-[28px] flex items-center justify-center rounded-full border border-[#00000033] bg-white hover:bg-black transition-colors duration-200 group">
                      <img
                        src="/images/ui/twitter.png"
                        alt="Twitter"
                        className="w-[11px] h-[9px] filter brightness-0 group-hover:brightness-0 group-hover:invert transition-all duration-200"
                      />
                    </div>

                    <div className="w-[28px] h-[28px] flex items-center justify-center rounded-full border border-[#00000033] bg-black hover:bg-white transition-colors duration-200 group">
                      <img
                        src="/images/ui/facebook.png"
                        alt="Facebook"
                        className="w-[6.32px] h-[12.17px] filter brightness-0 invert group-hover:filter-none transition-all duration-200"
                      />
                    </div>

                    <div className="w-[28px] h-[28px] flex items-center justify-center rounded-full border border-[#00000033] bg-white hover:bg-black transition-colors duration-200 group">
                      <img
                        src="/images/ui/instagram.png"
                        alt="Instagram"
                        className="w-[13.55px] h-[9px] filter brightness-0 group-hover:brightness-0 group-hover:invert transition-all duration-200"
                      />
                    </div>

                    <div className="w-[28px] h-[28px] flex items-center justify-center rounded-full border border-[#00000033] bg-white hover:bg-black transition-colors duration-200 group">
                      <img
                        src="/images/ui/github.png"
                        alt="GitHub"
                        className="w-[12.96px] h-[12.65px] filter brightness-0 group-hover:brightness-0 group-hover:invert transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:flex lg:flex-wrap justify-between gap-6 sm:gap-4 w-full lg:w-[800px]">
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
                      <li>
                        <a href="/faq" className="text-[#666] hover:text-black transition-colors">FAQ</a>
                      </li>
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
                    Shop.co 2000-2023, All Rights Reserved
                  </p>
                </div>

                <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-4">
                  {[
                    { name: 'visa-card', src: '/images/ui/visa-card.png' },
                    { name: 'master-card', src: '/images/ui/master-card.png' },
                    { name: 'paypal-card', src: '/images/ui/paypal-card.png' },
                    { name: 'apple-pay', src: '/images/ui/apple-pay.png' },
                    { name: 'googlepay-card', src: '/images/ui/googlepay-card.png' }
                  ].map((brand) => (
                    <div key={brand.name} className="w-[46px] h-[30px] rounded-[5px] border border-[#D6DCE5] bg-white flex items-center justify-center">
                      <img
                        src={brand.src}
                        alt={brand.name}
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