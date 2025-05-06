import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/shop">
        <a className="shop-link">Shop</a>
      </Link>
      {/* Other navigation links */}
    </nav>
  );
};

export default Navbar;
