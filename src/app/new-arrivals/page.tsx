import NewArrivals from '@/components/sections/NewArrivals';

export default function NewArrivalsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-8 py-7">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-['Integral_CF'] font-bold text-4xl md:text-5xl text-black mb-8">New Arrivals</h1>
          <p className="text-gray-600 mb-12">Check out our latest collection of fresh styles!</p>
          
          {/* Filter and sort section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 5h16M5 10h10M8 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Filters
              </button>
            </div>
            
            <div className="relative">
              <select className="px-4 py-2 pr-8 border border-gray-800 rounded-lg bg-white text-black font-medium appearance-none cursor-pointer hover:bg-gray-50 transition-colors">
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Products grid */}
          <NewArrivals />
        </div>
      </div>
    </div>
  );
}
