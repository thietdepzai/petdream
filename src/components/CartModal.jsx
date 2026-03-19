import React from 'react';
import { XMarkIcon, PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';

const CartModal = ({ isOpen, onClose, cart, addToCart, removeFromCart, checkout }) => {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out sm:rounded-l-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b bg-gray-50/80 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Giỏ hàng của bạn ({cart.reduce((ac, item) => ac + item.quantity, 0)})
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-red-500"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4 opacity-70">
              <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg">Giỏ hàng đang trống.</p>
              <button 
                onClick={onClose} 
                className="mt-4 px-6 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition font-medium"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.pet_id} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-xl border border-gray-100">
                   <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-bold text-gray-800 line-clamp-1 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {item.category_name}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-extrabold text-orange-600 text-lg">
                      {Number(item.price).toLocaleString()}đ
                    </span>
                    
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => removeFromCart(item.pet_id)}
                        className="p-2 hover:bg-gray-200 text-gray-600 transition"
                      >
                         {item.quantity === 1 ? <TrashIcon className="w-4 h-4 text-red-500" /> : <MinusIcon className="w-4 h-4" />}
                      </button>
                      <span className="w-10 text-center text-sm font-bold bg-white h-full flex items-center justify-center border-x border-gray-100">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="p-2 hover:bg-gray-200 text-gray-600 transition"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t bg-white shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] sticky bottom-0 z-10">
            <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-gray-500 text-sm">
                    <span>Tạm tính</span>
                    <span>{Number(totalAmount).toLocaleString()}đ</span>
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                    <span className="text-gray-800 font-semibold">Tổng cộng:</span>
                    <span className="text-2xl font-black text-orange-600">
                        {Number(totalAmount).toLocaleString()}đ
                    </span>
                </div>
            </div>
            
            <button 
              onClick={checkout}
              className="w-full bg-orange-500 flex justify-center items-center gap-2 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-orange-500/40 transform active:scale-[0.98]"
            >
              Thanh toán ngay
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;