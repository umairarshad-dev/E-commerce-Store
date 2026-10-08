# Premium Product Card & Quick View Modal

A premium, accessible, and fully responsive product card and Quick View modal system built with React, Next.js (App Router), TypeScript, and Tailwind CSS.

## Features

- **Clean, modern design** with soft shadows and smooth animations
- **Fully responsive** - works on mobile, tablet, and desktop
- **Accessible** - keyboard navigation, ARIA attributes, focus management
- **Reusable components** - modular architecture for easy integration
- **TypeScript support** - full type safety
- **Theme tokens** - CSS variables for easy customization

## Components

### ProductCard

A premium product card with:
- Portrait image area (3:4 ratio) with hover effects
- Category pill and wishlist heart button
- Quick View overlay (desktop) / eye icon (mobile)
- Image crossfade on hover
- Size chips with out-of-stock indicators
- Color swatches with selection state
- Price display with sale price support
- Cart button

### QuickViewModal

A comprehensive Quick View modal with:
- Dark backdrop with blur
- Image gallery with thumbnails
- Size and color selection
- Quantity stepper
- Size guide popover
- Add to Cart with validation
- View Full Details link
- Trust badges (free delivery, easy returns, COD)
- Keyboard accessible (ESC to close, focus trap)

### Supporting Components

- **SizeChips** - Reusable size selection with out-of-stock states
- **ColorSwatches** - Reusable color selection with visual feedback
- **QuantityStepper** - Quantity input with increment/decrement
- **ProductCardSkeleton** - Loading state skeleton
- **CartContext** - Cart state management

## Installation

The components are already installed in your project. To use them:

```tsx
import {
  ProductCard,
  QuickViewModal,
  PremiumCartProvider,
  usePremiumCart,
  type Product
} from '@/components/premium';
```

## Usage

### 1. Wrap your app with the CartProvider

```tsx
import { PremiumCartProvider } from '@/components/premium';

export default function Layout({ children }) {
  return <PremiumCartProvider>{children}</PremiumCartProvider>;
}
```

### 2. Use ProductCard in your component

```tsx
import { ProductCard, type Product } from '@/components/premium';

const product: Product = {
  id: '1',
  slug: 'product-slug',
  title: 'Product Name',
  category: 'MEN · T-SHIRTS',
  fabric: 'COTTON',
  price: 2499,
  compareAtPrice: 3499,
  badge: 'SALE',
  images: ['/image1.jpg', '/image2.jpg'],
  colors: [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
  ],
  sizes: [
    { label: 'S', inStock: true },
    { label: 'M', inStock: true },
    { label: 'L', inStock: false },
  ],
};

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductCard product={product} />
    </div>
  );
}
```

### 3. Add Quick View functionality

```tsx
import { useState } from 'react';
import { ProductCard, QuickViewModal, usePremiumCart } from '@/components/premium';

export default function ProductGrid() {
  const { addToCart } = usePremiumCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (product: Product, size?: string, color?: string) => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
      color: color || 'Default',
      size: size || 'Default',
    });
  };

  return (
    <>
      <ProductCard
        product={product}
        onQuickView={handleQuickView}
        onAddToCart={handleAddToCart}
      />
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
}
```

## Design Tokens

Customize the theme by modifying CSS variables in `globals.css`:

```css
:root {
  --accent: #2e7d32;          /* Primary accent color */
  --accent-soft: rgba(46, 125, 50, 0.1);  /* Accent at 10% opacity */
  --ink: #111827;             /* Primary text color */
  --muted: #6b7280;           /* Secondary text color */
  --surface: #ffffff;         /* Card background */
  --page: #faf9f6;            /* Page background */
}
```

## Demo Page

Visit `/premium-demo` to see the components in action with 8 mock products.

## Accessibility Features

- Keyboard navigation (Tab, Enter, Space, Escape)
- ARIA labels and roles
- Focus management and focus trapping
- Screen reader support
- Visible focus rings
- Alt text on all images

## Responsive Behavior

- **Mobile (< 640px)**: 1 column, eye icon for Quick View
- **Tablet (640px - 1024px)**: 2 columns
- **Desktop (> 1024px)**: 3-4 columns, Quick View text overlay

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript
- CSS Grid and Flexbox support required

## Performance

- Uses Next.js Image component for optimization
- Lazy loading support
- Skeleton loading states
- Minimal external dependencies

## License

This component system is part of your project.
