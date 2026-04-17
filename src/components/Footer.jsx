import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16 py-8 w-full border-t-4 border-orange-500">
      <div className="container mx-auto px-4 text-center space-y-3">
        <h3 className="text-2xl font-black text-orange-500 mb-2 flex items-center justify-center gap-2">
          <span>🐾</span> PetDream
        </h3>
        <p className="text-gray-300 font-medium text-sm md:text-base">
          © 2026 Bản quyền thuộc về Trần Ngọc Thiết.
        </p>
        <p className="text-gray-400 text-sm md:text-base flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
          <span>SĐT: <a href="tel:0xxxxxxxxx" className="hover:text-orange-400 transition-colors font-semibold text-gray-300">0xxx.xxx.xxx</a></span>
          <span className="hidden md:inline">|</span>
          <span>Email: <a href="mailto:tranngocthiet2k6@gmail.com" className="hover:text-orange-400 transition-colors font-semibold text-gray-300">tranngocthiet2k6@gmail.com</a></span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;