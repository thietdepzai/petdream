import React, { useContext } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ searchTerm, setSearchTerm, cartCount, onCartClick, onLoginClick }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md py-4 px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-40 transition-all duration-300">
      {/* Logo */}
      <Link 
        to="/"
        className="text-2xl font-black text-orange-600 flex items-center cursor-pointer tracking-tight hover:scale-105 transition-transform"
        onClick={() => { if(setSearchTerm) setSearchTerm(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      >
        <span className="text-3xl mr-1">🐾</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-700">PetDream</span>
      </Link>

      {/* Menu Điều Hướng */}
      <ul className="hidden lg:flex items-center gap-8 font-bold text-gray-600 text-sm tracking-wide">
        <li>
          <a href="/#home" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-orange-500 transition-colors cursor-pointer">
            Trang chủ
          </a>
        </li>
        <li>
          <a href="/#shop" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-orange-500 transition-colors cursor-pointer">
            Cửa hàng
          </a>
        </li>
        <li className="relative group/menu py-4">
          <div className="hover:text-orange-500 transition-colors cursor-pointer flex items-center gap-1">
            Cẩm nang
            <svg className="w-4 h-4 transition-transform group-hover/menu:rotate-180 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {/* Mega Menu Dropdown */}
          <div className="absolute top-full left-0 mt-[-10px] w-64 bg-white shadow-2xl rounded-2xl border border-orange-100 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 transform origin-top group-hover/menu:translate-y-0 translate-y-2 z-50 overflow-hidden">
            <ul className="py-2 flex flex-col font-medium">
               <li className="hover:bg-orange-50 transition-colors"><Link to="/cam-nang/cho" className="block px-6 py-3 text-gray-700 hover:text-orange-600">🐕 Nuôi Chó</Link></li>
               <li className="hover:bg-orange-50 transition-colors"><Link to="/cam-nang/meo" className="block px-6 py-3 text-gray-700 hover:text-orange-600">🐈 Nuôi Mèo</Link></li>
               <li className="hover:bg-orange-50 transition-colors"><Link to="/cam-nang/chuot" className="block px-6 py-3 text-gray-700 hover:text-orange-600">🐹 Nuôi Chuột (Hamster)</Link></li>
               <li className="hover:bg-orange-50 transition-colors"><Link to="/cam-nang/ran" className="block px-6 py-3 text-gray-700 hover:text-orange-600">🐍 Nuôi Rắn Cảnh</Link></li>
               <li className="hover:bg-orange-50 transition-colors"><Link to="/cam-nang/vet" className="block px-6 py-3 text-gray-700 hover:text-orange-600">🦜 Nuôi Vẹt</Link></li>
               <li className="hover:bg-orange-50 transition-colors"><Link to="/cam-nang/nhim" className="block px-6 py-3 text-gray-700 hover:text-orange-600">🦔 Nuôi Nhím Cảnh</Link></li>
               <li className="hover:bg-orange-50 transition-colors"><Link to="/cam-nang/bosat" className="block px-6 py-3 text-gray-700 hover:text-orange-600">🦎 Nuôi Bò Sát</Link></li>
            </ul>
          </div>
        </li>
        <li>
          <a href="/#about" onClick={(e) => { e.preventDefault(); navigate('/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-orange-500 transition-colors cursor-pointer">
            Giới thiệu
          </a>
        </li>
      </ul>

      {/* Tìm kiếm */}
      <div className="w-full md:flex-1 md:max-w-xl mx-0 md:mx-6 relative group">
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
        {searchTerm && setSearchTerm && (
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
        {user ? (
            <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">Chào, <strong className="text-orange-600">{user.username}</strong></span>
                {user.role === 'admin' && (
                    <Link to="/admin" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition">Quản lý</Link>
                )}
                <button 
                    onClick={() => { logout(); navigate('/'); }}
                    className="text-gray-500 hover:text-red-500 transition text-sm font-medium"
                >Đăng xuất</button>
            </div>
        ) : (
            <button onClick={onLoginClick} className="text-gray-600 hover:text-orange-500 font-semibold transition-colors text-sm sm:text-base hidden sm:block">
               Đăng nhập
            </button>
        )}

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