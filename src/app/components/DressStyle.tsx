import Image from 'next/image';
 
const DressStyle = () => {
  const dressStyles = [
    { 
      name: '', 
      image: '/casual-dress.png',
      containerClass: 'w-full h-[200px] sm:h-[250px] md:h-[280px] lg:w-[407px] lg:h-[289px] lg:absolute lg:top-[60px] lg:left-[50px]'
    },
    { 
      name: '', 
      image: '/formal-dress.png',
      containerClass: 'w-full h-[200px] sm:h-[250px] md:h-[280px] lg:w-[684px] lg:h-[289px] lg:absolute lg:top-[60px] lg:left-[500px]'
    },
    { 
      name: '', 
      image: '/party-dress.png',
      containerClass: 'w-full h-[200px] sm:h-[250px] md:h-[280px] lg:w-[684px] lg:h-[289px] lg:absolute lg:top-[380px] lg:left-[50px]'
    },
    { 
      name: '', 
      image: '/gym-dress.png',
      containerClass: 'w-full h-[200px] sm:h-[250px] md:h-[280px] lg:w-[407px] lg:h-[289px] lg:absolute lg:top-[380px] lg:left-[780px]'
    },
  ];

  return (
    <section className="flex justify-center items-center py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full lg:w-[1240px] min-h-[830px] rounded-[20px] lg:rounded-[40px] bg-[#F0F0F0] relative">
        <h2 className="font-bold text-[28px] sm:text-[36px] lg:text-[48px] leading-none pt-[24px] lg:pt-[40px] text-center text-black">
          BROWSE BY DRESS STYLE
        </h2>
        
        <div className="relative w-full p-4 lg:p-0 lg:h-[calc(100%-120px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:block">
            {dressStyles.map((style, index) => (
              <div 
                key={index}
                className={`
                  relative rounded-[12px] lg:rounded-[20px] overflow-hidden group 
                  transition-all duration-300 hover:scale-[1.02]
                  ${style.containerClass}
                `}
              >
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1239px"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                  <h3 className="text-[20px] sm:text-[24px] lg:text-[32px] font-bold text-white">
                    {style.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DressStyle;