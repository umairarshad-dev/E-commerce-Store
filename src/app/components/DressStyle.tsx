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
      containerClass: ''
    },
  ];

  return (
    <div className="w-full bg-white">
      <div className="px-8 py-7">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="font-['Integral CF'] font-bold text-4xl md:text-5xl text-black mb-8 text-center">
            BROWSE BY DRESS STYLE
          </h2>
          
          <div className="bg-[#F0F0F0] rounded-[20px] lg:rounded-[40px] p-4 lg:p-8 min-h-[600px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {dressStyles.map((style, index) => (
                <div 
                  key={index}
                  className="relative rounded-[12px] lg:rounded-[20px] overflow-hidden group aspect-[4/3] lg:aspect-auto lg:h-[289px] transition-all duration-300 hover:scale-[1.02]"
                >
                  <Image
                    src={style.image}
                    alt={style.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
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
      </div>
    </div>
  );
};

export default DressStyle;