'use client';

import { useCart } from '@/components/lib/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const subtotal = cartTotal;
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Cart</span>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-black">YOUR CART</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cartItems.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600">Your cart is empty</p>
                <Link
                  href="/"
                  className="mt-4 inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.color}-${item.size}`}
                    className="p-6 flex flex-col sm:flex-row rounded-[20px] border border-[#0000001A] pt-[20px] pr-[24px] pb-[20px] pl-[24px] gap-[24px]"
                  >
                    <div className="w-full sm:w-32 h-32 bg-gray-100 rounded overflow-hidden">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-lg text-black">{item.name}</h3>
                          <p className="text-gray-600">Size: {item.size}</p>
                          <p className="text-gray-600">Color: {item.color}</p>
                        </div>
                        <button
                          onClick={() =>
                            removeFromCart(item.id, item.color, item.size)
                          }
                          className="text-gray-400 hover:text-gray-600 "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center w-[100px] h-[44px] rounded-[62px] bg-[#F0F0F0] px-[16px] py-[8px] gap-[20px]">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.color, item.size, item.quantity - 1)
                            }
                            className="text-black hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="text-black">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.color, item.size, item.quantity + 1)
                            }
                            className="text-black hover:bg-gray-100 font-bold-bold"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-medium text-black">PKR {item.price * item.quantity}</p>
                      </div>


                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="lg:w-1/3">
              <div className="w-[460px] h-[458px]  top-[276px] left-[835px] rounded-[20px] border border-[#0000001A] p-[20px] px-[24px] gap-[24px]">
                <h2 className="text-xl font-bold mb-6 text-black">Order Summary</h2>

                <div className="space-y-6 w-[390px] h-[193px] ">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-black">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount (-20%)</span>
                    <span className="text-red-500">-${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="text-black">${deliveryFee.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between font-bold">
                    <span className="text-black">Total</span>
                    <span className="text-black pr-5">${total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-1 items-center bg-gray-100 rounded-full px-4 py-2">
                      <input
                        type="text"
                        placeholder="Add promo code"
                        className="flex-1 bg-transparent outline-none text-black placeholder:text-gray-400"
                      />
                    </div>
                    <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-300 hover:text-black transition">
                      Apply
                    </button>
                  </div>
                </div>



                <Link
                  href="/checkout"
                  className="block w-full bg-black text-white text-center py-3 rounded-full hover:bg-gray-800 transition font-medium"
                >
                  Go to Checkout    →
                </Link>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}