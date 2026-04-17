import React from 'react';

const About = () => {
  return (
    <section id="about" className="container mx-auto px-4 py-16 mt-8">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 max-w-4xl mx-auto text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
          Về <span className="text-orange-500">PetDream</span>
        </h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto mb-8 rounded-full"></div>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
          PetDream tự hào là shop thú cưng uy tín hàng đầu tại Huế. Chúng tôi chuyên cung cấp các dòng thú cưng cao cấp, đặc biệt là <strong>vẹt Macaw</strong> nhập khẩu, <strong>chó Husky</strong> thuần chủng và nhiều giống thú cưng đáng yêu khác. 
        <br/><br/>
          Với tình yêu thương động vật và kinh nghiệm nhiều năm, PetDream cam kết mang đến những người bạn bốn chân khỏe mạnh, lanh lợi cùng dịch vụ tư vấn, chăm sóc trọn đời tận tình nhất.
        </p>
      </div>
    </section>
  );
};

export default About;