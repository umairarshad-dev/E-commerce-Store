import NewArrivals from '../components/NewArrivals';

export default function OnSalePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-8 py-7">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-['Integral_CF'] font-bold text-4xl md:text-5xl text-black mb-8">On Sale</h1>
          <p className="text-gray-600 mb-12">Discover our latest sale items with amazing discounts!</p>
          
          {/* Filter and sort section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 5h16M5 10h10M8 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Filters
              </button>
            </div>
            
            <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white">
              <option>Most Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>
          
          {/* Products grid - Using NewArrivals component as placeholder */}
          <NewArrivals />
        </div>
      </div>
    </div>
  );
}
