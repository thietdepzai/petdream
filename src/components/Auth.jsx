import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast, Toaster } from 'react-hot-toast';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', full_name: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
    
    try {
      const response = await axios.post(endpoint, formData);
      if (response.data.success) {
        if (!isLogin) {
          toast.success('Chúc mừng Thiết đã đăng ký thành công!');
          setIsLogin(true);
        } else {
          // Xử lý khi đăng nhập thành công
          const userData = response.data.user || response.data;
          login(userData);
          if (onAuthSuccess) {
            onAuthSuccess();
          }
        }
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error("Lỗi: " + (err.response.data.message || "Không thể thực hiện yêu cầu"));
      } else {
        toast.error("Lỗi kết nối máy chủ!");
      }
    }
  };

  return (
    <div className="flex justify-center my-10 animate-fade-in-up">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
          {isLogin ? 'Đăng Nhập' : 'Tạo Tài Khoản'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <>
              <input type="text" placeholder="Tên đăng nhập (username)" className="border-2 border-gray-100 p-3 rounded-xl focus:border-orange-500 focus:outline-none transition" 
                required onChange={(e) => setFormData({...formData, username: e.target.value})} />
              <input type="text" placeholder="Họ và tên (full_name)" className="border-2 border-gray-100 p-3 rounded-xl focus:border-orange-500 focus:outline-none transition" 
                required onChange={(e) => setFormData({...formData, full_name: e.target.value})} />
            </>
          )}
          <input type="email" placeholder="Email" className="border-2 border-gray-100 p-3 rounded-xl focus:border-orange-500 focus:outline-none transition" 
            required onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="password" placeholder="Mật khẩu" minLength="6" className="border-2 border-gray-100 p-3 rounded-xl focus:border-orange-500 focus:outline-none transition" 
            required onChange={(e) => setFormData({...formData, password: e.target.value})} />
          
          <button className="bg-orange-500 text-white py-3.5 mt-2 rounded-xl text-lg font-black tracking-wide hover:bg-orange-600 active:scale-[0.98] transition-all shadow-md hover:shadow-orange-500/30">
            {isLogin ? 'VÀO PETDREAM' : 'ĐĂNG KÝ NGAY'}
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm font-medium text-gray-400">
          {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"} 
          <span 
            className="ml-1 text-orange-600 font-bold hover:underline cursor-pointer" 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Đăng ký tại đây" : "Đăng nhập ngay"}
          </span>
        </p>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Auth;