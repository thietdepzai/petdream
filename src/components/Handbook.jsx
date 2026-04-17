import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const handbookData = {
  cho: {
    title: "Cẩm nang nuôi Chó",
    icon: "🐕",
    intro: "Chó là người bạn trung thành và thông minh. Chúng cần sự quan tâm, vận động và tình yêu thương mỗi ngày.",
    care: "Cung cấp không gian sống sạch sẽ, thoáng mát. Dắt chó đi dạo ít nhất 30 phút mỗi ngày. Tắm rửa định kỳ 1-2 lần/tuần tùy giống.",
    food: "Nên ăn: Hạt công nghiệp chất lượng cao, thịt luộc (bò, gà, lợn), rau củ (cà rốt, bí đỏ). Tránh: Nho khô, chocolate, hành tỏi, xương gia cầm (dễ hóc)."
  },
  meo: {
    title: "Cẩm nang nuôi Mèo",
    icon: "🐈",
    intro: "Mèo là thú cưng độc lập, yên tĩnh nhưng cũng rất tình cảm. Chúng thích leo trèo và cần khay cát sạch sẽ.",
    care: "Cung cấp trụ cào móng, khay vệ sinh với cát chất lượng (dọn hàng ngày). Chải lông thường xuyên để tránh lông cuộn trong ruột.",
    food: "Nên ăn: Pate, thịt cá luộc, hạt dành riêng cho mèo có độ đạm cao. Tránh: Sữa bò (mèo hay bất dung nạp lactose), hành, tỏi, chocolate."
  },
  chuot: {
    title: "Cẩm nang nuôi Chuột (Hamster/Guinea Pig)",
    icon: "🐹",
    intro: "Chuột cảnh nhỏ bé, đáng yêu và dễ nuôi trong không gian hẹp. Chúng thường hoạt động nhiều vào ban đêm.",
    care: "Chuồng nuôi cần lót mùn cưa hoặc giấy nén thấm hút tốt, thay lót chuồng 1-2 lần/tuần. Cung cấp vòng quay để chúng chạy bộ tản năng lượng.",
    food: "Nên ăn: Hạt tổng hợp, ngũ cốc, cỏ khô, trái cây tươi lượng nhỏ. Tránh: Đồ ngọt, kẹo, trái cây có múi họ cam chanh (quá nhiều axit)."
  },
  ran: {
    title: "Cẩm nang nuôi Rắn cảnh",
    icon: "🐍",
    intro: "Rắn cảnh (như Corn Snake, Ball Python) rất hiền lành và dễ chăm sóc nếu đảm bảo đúng nhiệt độ và môi trường.",
    care: "Sử dụng chuồng kính có nắp đậy chắc chắn. Cần đèn sưởi hoặc thảm nhiệt để duy trì nhiệt độ (25-30 độ C) và tạo điểm sưởi, điểm mát. Cung cấp hang trú ẩn.",
    food: "Nên ăn: Chuột chíp/chuột bạch cấp đông (rã đông trước khi cho ăn). Cho ăn 1-2 tuần/lần tùy kích thước. Tránh: Bắt rắn từ tự nhiên, cho ăn đồ chưa rã đông hoàn toàn."
  },
  vet: {
    title: "Cẩm nang nuôi Vẹt",
    icon: "🦜",
    intro: "Vẹt (như Macaw, Sun Conure) là loài chim thông minh, có tuổi thọ cao và khả năng bắt chước tiếng người.",
    care: "Cần lồng nuôi rộng rãi, có nhiều cành đậu gỗ tự nhiên và đồ chơi để vẹt gặm nhấm. Dành thời gian tương tác hàng ngày để chim không bị stress tự nhổ lông.",
    food: "Nên ăn: Hạt dẻ, hạnh nhân, ngũ cốc, trái cây tươi (táo, ổi bỏ hạt), rau xanh. Tránh: Quả bơ, chocolate, đồ uống có cồn, hạt táo/lê (có độc tố)."
  },
  nhim: {
    title: "Cẩm nang nuôi Nhím cảnh",
    icon: "🦔",
    intro: "Nhím cảnh (Hedgehog) là thú cưng độc lạ, có lớp gai nhọn nhưng khi đã quen chủ sẽ rất hiền và cho bụng để vuốt ve.",
    care: "Môi trường nuôi cần ấm áp (tránh gió lùa). Lót chuồng sạch sẽ. Chăm sóc lồng hàng tuần và tắm nước ấm bằng bàn chải mềm định kỳ.",
    food: "Nên ăn: Thức ăn khô cho mèo (hạt nhỏ), sâu gạo (mealworm), dế làm phần thưởng. Tránh: Sữa bò, hạt cứng to, nho, trái cây họ cam chanh."
  },
  bosat: {
    title: "Cẩm nang nuôi Bò sát (Rồng Úc, Iguana)",
    icon: "🦎",
    intro: "Bò sát cảnh cần sự đầu tư về hệ thống đèn chiếu sáng và mô phỏng môi trường tự nhiên để phát triển khỏe mạnh.",
    care: "Yêu cầu bắt buộc phải có đèn UVB (giúp tổng hợp canxi) và đèn sưởi UVA. Môi trường chuồng nuôi phải phân chia khu vực nóng - lạnh rõ ràng.",
    food: "Nên ăn: Côn trùng (dế, gián, sâu) rắc bột canxi, rau xanh (chủ yếu cho Rồng đất Iguana). Tránh: Đom đóm tự nhiên (có thể chứa độc), rau xà lách (ít dinh dưỡng)."
  }
};

const Handbook = () => {
  const { loai } = useParams();
  const data = handbookData[loai] || handbookData['cho'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loai]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-6">
        <Link to="/" className="text-orange-500 hover:text-orange-700 font-semibold inline-flex items-center gap-2 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay lại trang chủ
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform transition-all hover:shadow-2xl">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-center">
          <div className="text-7xl mb-4 animate-bounce">{data.icon}</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-wide drop-shadow-md">{data.title}</h1>
        </div>
        
        <div className="p-8 md:p-12 space-y-8">
          <div className="bg-orange-50 rounded-2xl p-6 border-l-4 border-orange-500">
             <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                🌟 Giới thiệu chung
             </h2>
             <p className="text-gray-700 leading-relaxed">{data.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm hover:border-blue-200 transition-colors">
               <h2 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
                  🏡 Cách nuôi & chăm sóc
               </h2>
               <p className="text-gray-600 leading-relaxed text-sm md:text-base">{data.care}</p>
             </div>

             <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm hover:border-green-200 transition-colors">
               <h2 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                  🥩 Chế độ dinh dưỡng
               </h2>
               <p className="text-gray-600 leading-relaxed text-sm md:text-base">{data.food}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Handbook;