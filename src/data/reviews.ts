export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  /** product the reviewer bought */
  product: string;
  /** relative date label, e.g. "2 weeks ago" */
  date: string;
  /** optional real avatar photo; falls back to initials when absent/broken */
  avatarUrl?: string;
}

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations. The stitching is flawless, the fabrics feel premium, and everything arrives beautifully packed.",
    product: 'Modern Striped Shirt',
    date: '2 weeks ago',
  },
  {
    id: 2,
    name: 'Alex K.',
    rating: 5,
    text: 'Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions. Delivery was faster than promised too.',
    product: 'Slim Fit Denim',
    date: '1 month ago',
  },
  {
    id: 3,
    name: 'James L.',
    rating: 5,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends. Worth every rupee.",
    product: 'COURAGE GRAPHIC T-SHIRT',
    date: '3 weeks ago',
  },
  {
    id: 4,
    name: 'Ayesha R.',
    rating: 4,
    text: 'Great quality tees at a fair price. The size guide was accurate and customer support helped me swap a colour within a day. My only wish is that more sizes were restocked more often.',
    product: 'Gradient Graphic T-shirt',
    date: '5 days ago',
  },
  {
    id: 5,
    name: 'Daniel W.',
    rating: 5,
    text: 'The checkout was smooth, cash on delivery made it risk-free, and the jeans fit perfectly on the first try. This is now my go-to store for wardrobe refreshes.',
    product: 'SKINNY FIT JEANS',
    date: '1 week ago',
  },
  {
    id: 6,
    name: 'Mia T.',
    rating: 5,
    text: 'Absolutely love my checkered shirt — the fabric is soft yet durable and it holds its shape after washing. Shipping to Karachi took just two days.',
    product: 'CHECKERED SHIRT',
    date: '4 days ago',
  },
];

export const REVIEW_STATS = {
  rating: 4.9,
  totalLabel: '2,000+',
};
