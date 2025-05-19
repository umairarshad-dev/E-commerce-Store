import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  stars: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    stars: 5,
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: "Alex K.",
    stars: 5,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    id: 3,
    name: "James L.",
    stars: 5,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const Reviews: React.FC = () => {
  return (
    <div className="relative w-full flex justify-center items-center bg-white py-8 sm:py-12 lg:pb-20">
      <div className="w-full flex justify-center items-center px-4 sm:px-6 lg:px-24">
        <div className="container mx-auto">
          <div className="mb-4 sm:mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="font-['Integral CF'] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[64px] leading-tight lg:leading-[76px] tracking-normal text-black text-center sm:text-left">
              OUR HAPPY CUSTOMERS
            </h2>
            <div className="flex gap-4">
              <div className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors">
                <Image 
                  src="/Arrow-left.png" 
                  alt="Previous" 
                  width={16} 
                  height={13}
                  className="cursor-pointer w-3 h-3 sm:w-4 sm:h-4 lg:w-[16px] lg:h-[13px]" 
                />
              </div>
              <div className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors">
                <Image 
                  src="/Arrow-right.png" 
                  alt="Next" 
                  width={16} 
                  height={13}
                  className="cursor-pointer w-3 h-3 sm:w-4 sm:h-4 lg:w-[16px] lg:h-[13px]" 
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[36px]">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="pb-8 sm:pb-12 lg:pb-20">
                <div className="bg-white rounded-[20px] p-4 sm:p-6 lg:p-[20px_32px] w-full h-auto min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] border border-[#0000001A] transition-shadow hover:shadow-lg">
                  <StarRating rating={testimonial.stars} />
                  <div className="flex items-center mt-3 sm:mt-4 mb-2">
                    <h3 className="text-black text-base sm:text-lg lg:text-[20px] leading-tight lg:leading-[22px] tracking-normal font-bold mr-2">
                      {testimonial.name}
                    </h3>
                    <Image 
                      src="/verified-tick.png" 
                      alt="verified" 
                      width={16} 
                      height={16}
                      className="w-4 h-4 lg:w-[16px] lg:h-[16px]"
                    />
                  </div>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base lg:text-[16px] leading-relaxed lg:leading-[22px] tracking-normal font-normal">
                    &quot;{testimonial.text}&quot;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;