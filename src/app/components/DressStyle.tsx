import Image from 'next/image';
import Image from 'next/image';

const DressStyle = () => {
  const dressStyles = [
    { 
      name: 'Casual', 
      image: '/casual-dress.png',
      containerClass: 'sm:h-[200px] md:h-[240px] lg:w-[407px] lg:h-[289px] lg:absolute lg:top-[60px] lg:left-[50px]'
    },
    { 
      name: 'Formal', 
      image: '/formal-dress.png',
      containerClass: 'sm:h-[200px] md:h-[240px] lg:w-[684px] lg:h-[289px] lg:absolute lg:top-[60px] lg:left-[500px]'
    },
    { 
      name: 'Party', 
      image: '/party-dress.png',
      containerClass: 'sm:h-[200px] md:h-[240px] lg:w-[684px] lg:h-[289px] lg:absolute lg:top-[380px] lg:left-[50px]'
    },
    { 
      name: 'Gym', 
      image: '/gym-dress.png',
      containerClass: 'sm:h-[200px] md:h-[240px] lg:w-[407px] lg:h-[289px] lg:absolute lg:top-[380px] lg:left-[780px]'
    },
  ];

  return (
    <section className="flex justify-center items-center py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-[1240px] min-h-[auto] sm:min-h-[600px] lg:min-h-[830px] rounded-[12px] sm:rounded-[16px] lg:rounded-[40px] bg-[#F0F0F0] relative">
        <h2 className="font-bold text-[20px] sm:text-[24px] lg:text-[48px] leading-tight pt-[16px] sm:pt-[20px] lg:pt-[40px] text-center text-black px-4">
          BROWSE BY DRESS STYLE
        </h2>
        
        <div className="relative w-full p-3 sm:p-4 lg:p-0 lg:h-[calc(100%-120px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:block">
            {dressStyles.map((style, index) => (
              <div 
                key={index}
                className={`
                  relative h-[140px] w-full rounded-[8px] 
                  sm:rounded-[12px] lg:rounded-[20px] 
                  overflow-hidden group 
                  transition-all duration-300 hover:scale-[1.02]
                  ${style.containerClass}
                `}
              >
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1239px) 50vw, 1239px"
                  priority={index < 2}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                <div className="absolute bottom-2 sm:bottom-3 lg:bottom-6 left-3 sm:left-4 lg:left-6">
                  <h3 className="text-[18px] sm:text-[20px] lg:text-[32px] font-bold text-white">
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