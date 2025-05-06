'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  verified?: boolean;
}

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export default function ProductReviews({
  reviews,
  averageRating,
  totalReviews,
}: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<'latest' | 'helpful'>('latest');
  const [visibleCount, setVisibleCount] = useState(6);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.helpful - a.helpful;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-24 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center gap-2 ">
          <h2 className="text-xl font-bold text-black">All Reviews</h2>
          <span className="text-gray-500 font-semibold">({totalReviews})</span>
        </div>
        <div className="flex items-center gap-2 ">
          <button className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#F0F0F0] text-black font-medium text-sm shadow-sm">
            <img
              src="/filter.png"
              alt="Shop"
              className="w-[20px] h-[16.5px] top-[2.63px] left-[1.88px] text-black"
            />
          </button>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'latest' | 'helpful')}
            className="rounded-full px-3 py-2 text-sm bg-[#F0F0F0] text-black font-medium shadow-sm"
          >
            <option value="latest">Latest</option>
            <option value="helpful">Most Helpful</option>
          </select>
          <button className="ml-2 px-6 py-3 rounded-full bg-black text-white text-base hover:bg-gray-900 transition font-satoshi font-medium text-[16px] leading-[100%] tracking-[0]">Write a Review</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedReviews.slice(0, visibleCount).map((review) => (
          <div key={review.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-2 relative">
            <div className="flex items-center gap-2 mb-2 ">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${i < Math.round(review.rating) ? 'text-yellow-400' : 'text-gray-200'}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mb-1 ">
              <span className="font-bold text-black text-base">
                {review.user}
              </span>
              {review.verified && <span className="ml-1 text-green-600 font-bold text-base">●</span>}
            </div>
            <p className="text-gray-700 text-base mb-2">{review.comment}</p>
            <span className="text-gray-400 text-sm">Posted on {review.date}</span>
            <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100">
              <EllipsisHorizontalIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        ))}
      </div>

      {visibleCount < sortedReviews.length && (
        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 rounded-full bg-gray-100 text-black font-semibold text-base hover:bg-gray-200 transition"
            onClick={() => setVisibleCount(visibleCount + 6)}
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
} 