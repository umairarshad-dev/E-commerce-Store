import Image from 'next/image';

export default function BrandsPage() {
  const brands = [
    { 
      name: "Nike", 
      description: "Just Do It", 
      productCount: 245,
      logo: "/versace-collection.png",
      featuredImage: "/shirt01.png",
      bgClass: "bg-gray-900"
    },
    { 
      name: "Adidas", 
      description: "Impossible is Nothing", 
      productCount: 189,
      logo: "/gucci-collection.png",
      featuredImage: "/pent02.png",
      bgClass: "bg-gray-800"
    },
    { 
      name: "Puma", 
      description: "Forever Faster", 
      productCount: 156,
      logo: "/prada-collection.png",
      featuredImage: "/shirt02.png",
      bgClass: "bg-gray-700"
    },
    { 
      name: "Reebok", 
      description: "Be More Human", 
      productCount: 134,
      logo: "/calvin-collection.png",
      featuredImage: "/pent01.png",
      bgClass: "bg-gray-600"
    },
    { 
      name: "Under Armour", 
      description: "Protect This House", 
      productCount: 98,
      logo: "/zara-collection.png",
      featuredImage: "/T-shirt02.png",
      bgClass: "bg-gray-500"
    },
    { 
      name: "New Balance", 
      description: "Endeavor to Persevere", 
      productCount: 87,
      logo: "/versace-collection.png",
      featuredImage: "/T-shirt03.png",
      bgClass: "bg-gray-400"
    },
    { 
      name: "Converse", 
      description: "Shoes Are Boring", 
      productCount: 76,
      logo: "/gucci-collection.png",
      featuredImage: "/shirt04.png",
      bgClass: "bg-gray-300"
    },
    { 
      name: "Vans", 
      description: "Off the Wall", 
      productCount: 65,
      logo: "/prada-collection.png",
      featuredImage: "/shirt05.png",
      bgClass: "bg-gray-200"
    }
  ];

  return (
    <div className="w-full bg-white">
      <div className="px-8 py-7">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-['Integral_CF'] font-bold text-4xl md:text-5xl text-black mb-4">Brands</h1>
          <p className="text-gray-600 mb-12">Shop from your favorite brands</p>
          
          {/* Featured Brands Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {brands.slice(0, 4).map((brand, index) => (
              <div key={brand.name} className="relative group cursor-pointer overflow-hidden rounded-2xl">
                <div className={`relative h-48 ${brand.bgClass} transition-transform duration-300 group-hover:scale-105`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <Image
                    src={brand.featuredImage}
                    alt={brand.name}
                    width={200}
                    height={200}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="flex items-center gap-2 mb-2">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={40}
                        height={20}
                        className="h-8 w-auto object-contain filter brightness-0 invert"
                      />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">{brand.name}</h3>
                    <p className="text-white/80 text-sm">{brand.description}</p>
                    <p className="text-white/60 text-xs mt-1">{brand.productCount} products</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* All Brands Grid */}
          <h2 className="font-['Integral_CF'] font-bold text-2xl md:text-3xl text-black mb-6">All Brands</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <div key={brand.name} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="flex items-center justify-center h-20 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={60}
                      height={30}
                      className="w-12 h-auto object-contain"
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-black mb-2 text-center">{brand.name}</h3>
                <p className="text-gray-600 text-sm text-center mb-3">{brand.description}</p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <span>{brand.productCount} products</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
                    <path d="M6 9l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Brand Categories */}
          <div className="mt-16">
            <h2 className="font-['Integral_CF'] font-bold text-2xl md:text-3xl text-black mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Athletic', 'Casual', 'Formal', 'Streetwear'].map((category) => (
                <div key={category} className="relative group cursor-pointer rounded-xl overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </div>
                      <h3 className="font-semibold text-black">{category}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
