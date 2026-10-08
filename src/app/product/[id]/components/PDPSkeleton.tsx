export default function PDPSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 animate-pulse">
      {/* Breadcrumb */}
      <div className="h-3 w-48 bg-gray-100 rounded-full mb-8" />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Gallery skeleton */}
        <div className="lg:w-[55%] flex gap-3">
          <div className="hidden lg:flex flex-col gap-2.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-16 h-16 bg-gray-100 rounded-xl" />
            ))}
          </div>
          <div className="flex-1 aspect-[4/5] bg-gray-100 rounded-3xl" />
        </div>

        {/* Buy box skeleton */}
        <div className="lg:w-[45%] flex flex-col gap-5">
          <div className="h-3 w-32 bg-gray-100 rounded-full" />
          <div className="h-3 w-28 bg-gray-100 rounded-full" />
          <div className="h-8 w-3/4 bg-gray-100 rounded-xl" />
          <div className="h-8 w-32 bg-gray-100 rounded-full" />
          <div className="h-3 w-full bg-gray-100 rounded-full" />
          <div className="h-3 w-5/6 bg-gray-100 rounded-full" />
          <div className="h-3 w-2/3 bg-gray-100 rounded-full" />

          <div className="flex gap-2.5 mt-2">
            {[0, 1, 2].map((i) => <div key={i} className="w-8 h-8 bg-gray-100 rounded-full" />)}
          </div>
          <div className="flex gap-2 mt-1">
            {[0, 1, 2, 3].map((i) => <div key={i} className="w-14 h-11 bg-gray-100 rounded-xl" />)}
          </div>

          <div className="flex gap-3 mt-2">
            <div className="w-32 h-14 bg-gray-100 rounded-2xl" />
            <div className="flex-1 h-14 bg-gray-100 rounded-2xl" />
          </div>
          <div className="h-12 w-full bg-gray-100 rounded-2xl" />
          <div className="h-24 w-full bg-gray-100 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
