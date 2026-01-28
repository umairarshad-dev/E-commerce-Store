export default function BrandsPage() {
  const brands = [
    { name: "Nike", description: "Just Do It", productCount: 245 },
    { name: "Adidas", description: "Impossible is Nothing", productCount: 189 },
    { name: "Puma", description: "Forever Faster", productCount: 156 },
    { name: "Reebok", description: "Be More Human", productCount: 134 },
    { name: "Under Armour", description: "Protect This House", productCount: 98 },
    { name: "New Balance", description: "Endeavor to Persevere", productCount: 87 },
    { name: "Converse", description: "Shoes Are Boring", productCount: 76 },
    { name: "Vans", description: "Off the Wall", productCount: 65 }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="px-8 py-7">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-['Integral_CF'] font-bold text-4xl md:text-5xl text-black mb-8">Brands</h1>
          <p className="text-gray-600 mb-12">Shop from your favorite brands</p>
          
          {/* Brands Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <div key={brand.name} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-center h-24 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-600">{brand.name.charAt(0)}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-black mb-2">{brand.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{brand.description}</p>
                <p className="text-sm text-gray-500">{brand.productCount} products</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
