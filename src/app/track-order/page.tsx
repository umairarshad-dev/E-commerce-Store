'use client';

import React, { useState } from 'react';

type TrackingStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

interface OrderTracking {
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  currentStep: number;
  steps: Array<{ step: string; completed: boolean; date?: string }>;
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [trackingStatus, setTrackingStatus] = useState<TrackingStatus>('idle');
  const [orderData, setOrderData] = useState<OrderTracking | null>(null);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderNumber || !contactInfo) {
      setTrackingStatus('empty');
      return;
    }

    setTrackingStatus('loading');

    setTimeout(() => {
      if (orderNumber.toLowerCase() === 'ord12345') {
        setOrderData({
          orderNumber: orderNumber.toUpperCase(),
          status: 'In Transit',
          estimatedDelivery: 'October 15, 2026',
          currentStep: 2,
          steps: [
            { step: 'Order Placed', completed: true, date: 'October 5, 2026' },
            { step: 'Order Confirmed', completed: true, date: 'October 5, 2026' },
            { step: 'Shipped', completed: true, date: 'October 7, 2026' },
            { step: 'Out for Delivery', completed: false },
            { step: 'Delivered', completed: false },
          ],
        });
        setTrackingStatus('success');
      } else {
        setTrackingStatus('error');
      }
    }, 1500);
  };

  const resetForm = () => {
    setOrderNumber('');
    setContactInfo('');
    setTrackingStatus('idle');
    setOrderData(null);
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="px-8 py-12">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="font-['Integral_CF'] font-bold text-4xl md:text-5xl text-black mb-4 text-center">
            Track Your Order
          </h1>
          <p className="text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Enter your order number and contact information to track your order status and delivery details.
          </p>

          <div className="max-w-2xl mx-auto">
            {trackingStatus === 'idle' && (
              <form onSubmit={handleTrackOrder} className="space-y-6">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-black mb-2">
                    Order Number
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
                    placeholder="e.g., ORD12345"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Hint: Use ORD12345 for a demo order
                  </p>
                </div>

                <div>
                  <label htmlFor="contactInfo" className="block text-sm font-medium text-black mb-2">
                    Email or Phone
                  </label>
                  <input
                    type="text"
                    id="contactInfo"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black"
                    placeholder="your.email@example.com or +92 300 1234567"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-black/90 transition-colors"
                >
                  Track Order
                </button>
              </form>
            )}

            {trackingStatus === 'loading' && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
                <p className="text-gray-600">Tracking your order...</p>
              </div>
            )}

            {trackingStatus === 'empty' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600 font-medium mb-4">Please fill in all required fields</p>
                <button
                  onClick={resetForm}
                  className="text-black underline hover:text-gray-700"
                >
                  Try Again
                </button>
              </div>
            )}

            {trackingStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600 font-medium mb-2">Order Not Found</p>
                <p className="text-gray-600 mb-4">
                  We couldn't find an order matching the provided information. Please check your order number and contact details.
                </p>
                <button
                  onClick={resetForm}
                  className="bg-black text-white py-2 px-6 rounded-full font-medium hover:bg-black/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {trackingStatus === 'success' && orderData && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-3xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="font-['Integral_CF'] font-bold text-2xl text-black mb-2">
                        Order #{orderData.orderNumber}
                      </h2>
                      <p className="text-gray-600">Status: <span className="font-semibold text-black">{orderData.status}</span></p>
                    </div>
                    <button
                      onClick={resetForm}
                      className="text-sm text-gray-600 hover:text-black underline"
                    >
                      Track Another Order
                    </button>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-600">
                      Estimated Delivery: <span className="font-semibold text-black">{orderData.estimatedDelivery}</span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    {orderData.steps.map((step, index) => (
                      <div key={step.step} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step.completed ? 'bg-black text-white' : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            {step.completed ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span className="text-sm">{index + 1}</span>
                            )}
                          </div>
                          {index < orderData.steps.length - 1 && (
                            <div
                              className={`w-0.5 h-12 my-1 ${
                                step.completed ? 'bg-black' : 'bg-gray-200'
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1 pt-1">
                          <p className={`font-medium ${step.completed ? 'text-black' : 'text-gray-400'}`}>
                            {step.step}
                          </p>
                          {step.date && (
                            <p className="text-sm text-gray-500">{step.date}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Need help?</strong> If you have any questions about your order, please contact our customer support at support@pakipreneurs.com
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
