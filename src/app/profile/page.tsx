'use client';

import { useState } from 'react';
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from 'next/image';

export default function ProfilePage() {
  const { cartCount } = useCart();
  const [activeTab, setActiveTab] = useState('orders');

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 245.00,
      items: 3
    },
    {
      id: 'ORD-002', 
      date: '2024-01-10',
      status: 'Processing',
      total: 180.50,
      items: 2
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'Shipped',
      total: 320.00,
      items: 4
    }
  ];

  const addresses = [
    {
      id: 1,
      type: 'Home',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      isDefault: false
    }
  ];

  return (
    <div className="w-full bg-white">
      <div className="px-8 py-7">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-['Integral_CF'] font-bold text-4xl md:text-5xl text-black mb-8">My Account</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-3">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h2 className="font-bold text-lg text-black">John Doe</h2>
                  <p className="text-gray-600 text-sm">john.doe@example.com</p>
                </div>
                
                <nav className="space-y-2">
                  {[
                    { id: 'orders', label: 'My Orders', icon: '📦' },
                    { id: 'profile', label: 'Profile Settings', icon: '👤' },
                    { id: 'addresses', label: 'Addresses', icon: '📍' },
                    { id: 'payment', label: 'Payment Methods', icon: '💳' },
                    { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
                    { id: 'notifications', label: 'Notifications', icon: '🔔' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-black text-white'
                          : 'hover:bg-gray-200 text-black'
                      }`}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
                
                <button className="w-full mt-6 text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  Sign Out
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'orders' && (
                <div>
                  <h2 className="font-bold text-2xl text-black mb-6">My Orders</h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                          <div>
                            <h3 className="font-semibold text-lg text-black">{order.id}</h3>
                            <p className="text-gray-600 text-sm">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                            <p className="text-lg font-bold text-black mt-1">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-gray-600 text-sm">{order.items} items</p>
                          <button className="text-black hover:text-gray-600 font-medium text-sm">
                            View Details →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h2 className="font-bold text-2xl text-black mb-6">Profile Settings</h2>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="john.doe@example.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          defaultValue="+1 (555) 123-4567"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </div>
                    <button className="mt-6 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <h2 className="font-bold text-2xl text-black mb-6">Addresses</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {addresses.map((address) => (
                      <div key={address.id} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold text-lg text-black">{address.type}</h3>
                          {address.isDefault && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Default</span>
                          )}
                        </div>
                        <div className="text-gray-600 text-sm">
                          <p>{address.street}</p>
                          <p>{address.city}, {address.state} {address.zipCode}</p>
                          <p>{address.country}</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button className="text-black hover:text-gray-600 font-medium text-sm">Edit</button>
                          <button className="text-red-600 hover:text-red-700 font-medium text-sm">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Add New Address
                  </button>
                </div>
              )}

              {activeTab === 'payment' && (
                <div>
                  <h2 className="font-bold text-2xl text-black mb-6">Payment Methods</h2>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-xl p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs font-bold">VISA</span>
                          </div>
                          <div>
                            <p className="font-medium text-black">•••• 4242</p>
                            <p className="text-gray-600 text-sm">Expires 12/25</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-black hover:text-gray-600 font-medium text-sm">Edit</button>
                          <button className="text-red-600 hover:text-red-700 font-medium text-sm">Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="mt-6 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Add Payment Method
                  </button>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="font-bold text-2xl text-black mb-6">Wishlist</h2>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-black mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-6">Add items to your wishlist to see them here</p>
                    <Link href="/shop" className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="font-bold text-2xl text-black mb-6">Notifications</h2>
                  <div className="space-y-4">
                    {[
                      { title: 'Order Updates', description: 'Get notified about your order status', enabled: true },
                      { title: 'Promotions', description: 'Receive special offers and discounts', enabled: true },
                      { title: 'New Arrivals', description: 'Be the first to know about new products', enabled: false },
                      { title: 'Newsletter', description: 'Weekly newsletter with latest trends', enabled: true }
                    ].map((notification, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-xl">
                        <div>
                          <h3 className="font-medium text-black">{notification.title}</h3>
                          <p className="text-gray-600 text-sm">{notification.description}</p>
                        </div>
                        <button
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notification.enabled ? 'bg-black' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notification.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
