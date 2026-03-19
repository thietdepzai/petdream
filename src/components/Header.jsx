import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const Header = ({ searchTerm, setSearchTerm, cartCount, onCartClick }) => {
  return (
    <nav className="bg-white shadow-md py-4 px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-40 transition-all duration-300">
      {/* Logo */}
      <div 
        className="text-2xl font-black text-orange-600 flex items-center cursor-pointer tracking-tight hover:scale-105 transition-transform"
        onClick={() => { setSearchTerm(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      >
        <span className="text-3xl mr-1">🐾</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-700">PetDream</span>
      </div>

      {/* Tìm kiếm */}
      <div className="w-full md:flex-1 md:max-w-xl mx-0 md:mx-10 relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm thú cưng bạn yêu thích..."
          className="w-full border-2 border-gray-100 rounded-full pl-12 pr-4 py-2.5 bg-gray-50 focus:bg-white focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all text-sm font-medium text-gray-700 placeholder-gray-400 shadow-inner"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
             className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
          </button>
        )}
      </div>

      {/* Menu nút bấm */}
      <div className="flex gap-4 sm:gap-6 items-center w-full md:w-auto justify-between md:justify-end">
        <button className="text-gray-600 hover:text-orange-500 font-semibold transition-colors text-sm sm:text-base hidden sm:block">
           Đăng nhập
        </button>
        <button 
          onClick={onCartClick}
          className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-full hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-[0.98] group relative"
        >
          <ShoppingCartIcon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
          <span className="font-semibold tracking-wide">Giỏ hàng</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm scale-100 animate-fade-in">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Header;