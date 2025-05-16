 import Image from 'next/image';

const DressStyle = () => {
  const dressStyles = [
    { 
      name: '', 
      image: '/casual-dress.png',
      containerClass: 'w-[407px] h-[289px] absolute top-[60px] left-[84px]'
    },
    { 
      name: '', 
      image: '/formal-dress.png',
      containerClass: 'w-[684px] h-[289px] absolute top-[60px] left-[540px]'
    },
    { 
      name: '', 
      image: '/party-dress.png',
      containerClass: 'w-[684px] h-[289px] absolute top-[380px] left-[84px]'
    },
    { 
      name: '', 
      image: '/gym-dress.png',
      containerClass: 'w-[407px] h-[289px] absolute top-[380px] left-[816px]'
    },
  ];

  return (
    <section className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-[1320px] h-[830px] rounded-[40px] bg-[#F0F0F0] relative">
         <h2 className="font-bold text-[48px] leading-none pt-[40px] text-center text-black ">
          BROWSE BY DRESS STYLE
        </h2>
        
         <div className="relative w-full h-[calc(100%-120px)]">
          {dressStyles.map((style, index) => (
            <div 
              key={index}
              className={`${style.containerClass} rounded-[20px] overflow-hidden group transition-all duration-300 hover:scale-[1.02]`}
            >
              <Image
                src={style.image}
                alt={style.name}
                fill
                className="object-cover"
                sizes="(max-width: 1239px) 100vw, 1239px"
              />
              
               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
               <div className="absolute bottom-6 left-6">
                <h3 className="text-[32px] font-bold text-white">
                  {style.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DressStyle;