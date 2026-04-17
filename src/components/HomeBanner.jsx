import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

// Import CSS của Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HomeBanner = () => {
  // Cấu trúc mảng chứa các ảnh banner (Vẹt, Husky, Mèo ALN)
  // Đã cập nhật để dùng ảnh banner mới nhất của bạn
  const bannerImages = [
    {
      id: 1,
      title: "Pet Dream - Shop thú cưng uy tín",
      url: "/images/banner1.png" 
    },
    {
      id: 2,
      title: "Sản phẩm nổi bật",
      url: "/images/banner2.png" 
    },
    {
      id: 3,
      title: "Ngày siêu giảm giá 20.4",
      url: "/images/banner3.png" 
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto my-6 px-4">
      {/* Container với width full, bo góc và ẩn nội dung tràn ra ngoài để Swiper không bị vuông góc */}
      <div className="rounded-2xl overflow-hidden shadow-xl w-full">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false, // Vẫn autuplay ngay cả khi người dùng click
          }}
          className="w-full h-[300px] md:h-[450px] lg:h-[550px]" // Chiều cao Responsive theo kích thước màn hình
        >
          {bannerImages.map((image) => (
            <SwiperSlide key={image.id}>
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeBanner;