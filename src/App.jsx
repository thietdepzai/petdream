import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import CartModal from './components/CartModal'
import Toast from './components/Toast'

function App() {
  const [pets, setPets] = useState([])
  const [category, setCategory] = useState('Tất cả')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  // Giỏ hàng State
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Chi tiết thú cưng (Modal)
  const [selectedPet, setSelectedPet] = useState(null)

  // Toast
  const [toast, setToast] = useState({ show: false, message: '' })

  const fetchPets = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:5000/api/pets')
      setPets(response.data)
    } catch (error) {
      console.error("Lỗi:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPets() }, [])

  // Các hàm Giỏ hàng
  const addToCart = (pet) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.pet_id === pet.pet_id);
      if (existingItem) {
        return prevCart.map(item =>
          item.pet_id === pet.pet_id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...pet, quantity: 1 }];
    });
    
    if(selectedPet) {
        setSelectedPet(null);
    }
    
    showToast(`Đã thêm ${pet.title} vào giỏ hàng!`);
  };

  const removeFromCart = (petId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.pet_id === petId);
      if (existingItem.quantity === 1) {
        return prevCart.filter(item => item.pet_id !== petId);
      }
      return prevCart.map(item =>
        item.pet_id === petId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const checkout = () => {
     alert('Chức năng thanh toán đang được phát triển!');
     setCart([]);
     setIsCartOpen(false);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  // Lọc
  const filteredPets = pets.filter(pet => {
    const matchesCategory = category === 'Tất cả' || pet.category_name === category;
    const matchesSearch = pet.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-800">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        cartCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Bộ lọc danh mục */}
      <div className="flex flex-wrap gap-3 justify-center my-8 px-4">
        {['Tất cả', 'Chó cảnh', 'Mèo cảnh', 'Chim cảnh'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2.5 rounded-full border-2 transition-all shadow-sm font-semibold whitespace-nowrap ${
              category === cat
                ? 'bg-orange-500 text-white border-orange-500 shadow-orange-500/30'
                : 'bg-white text-orange-600 border-orange-200 hover:border-orange-500 hover:bg-orange-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 border-l-4 border-orange-500 pl-4">
              {searchTerm
                ? `Kết quả tìm kiếm: "${searchTerm}"`
                : (category === 'Tất cả' ? 'Thú cưng nổi bật' : `Danh sách ${category}`)
              }
            </h2>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 py-1.5 px-4 rounded-full hidden sm:inline-block">
               {filteredPets.length} kết quả
            </span>
        </div>

        {loading ? (
           <div className="flex flex-col justify-center items-center py-20 gap-4">
             <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-orange-500"></div>
             <p className="text-gray-500 font-medium animate-pulse">Đang tải dữ liệu...</p>
           </div>
        ) : filteredPets.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🐾</div>
            <p className="text-xl text-gray-500 font-medium">Không tìm thấy thú cưng nào phù hợp</p>
            <button 
              onClick={() => { setCategory('Tất cả'); setSearchTerm(''); }}
              className="mt-6 px-6 py-2 bg-orange-50 text-orange-600 font-semibold rounded-lg hover:bg-orange-100 transition"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
            {filteredPets.map(pet => (
              <div 
                key={pet.pet_id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group flex flex-col h-full"
                onClick={() => setSelectedPet(pet)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img 
                    src={pet.image_url} 
                    alt={pet.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {pet.category_name}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-orange-500 transition-colors line-clamp-1">{pet.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex items-center gap-1.5 line-clamp-1">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                     </svg>
                     Giống: {pet.breed || 'Chưa cập nhật'}
                  </p>
                  <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-50">
                    <span className="text-xl font-black text-orange-600">
                      {Number(pet.price).toLocaleString()}đ
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(pet);
                      }}
                       className="bg-gray-100 text-gray-700 p-2.5 rounded-full hover:bg-orange-500 hover:text-white transition-colors title='Thêm vào giỏ hàng'"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        addToCart={addToCart} 
        removeFromCart={removeFromCart}
        checkout={checkout}
      />

      {/* Pet Detail Modal */}
      {selectedPet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           {/* Backdrop */}
           <div 
             className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
             onClick={() => setSelectedPet(null)}
           ></div>
           
           {/* Content */}
           <div 
             className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative z-10 animate-fade-in-up" 
           >
              <button 
                onClick={() => setSelectedPet(null)} 
                className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm text-gray-500 hover:text-red-500 p-2 rounded-full hover:bg-white shadow-sm transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="md:w-1/2 bg-gray-50 aspect-square md:aspect-auto md:h-auto relative">
                 <img 
                    src={selectedPet.image_url} 
                    alt={selectedPet.title} 
                    className="w-full h-full object-cover"
                 />
              </div>

              <div className="md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto max-h-[50vh] md:max-h-none">
                 <div className="flex items-center gap-2 mb-3">
                   <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {selectedPet.category_name}
                   </span>
                 </div>
                 
                 <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">{selectedPet.title}</h2>
                 <p className="text-3xl font-black text-orange-600 mb-6">{Number(selectedPet.price).toLocaleString()}đ</p>

                 <div className="space-y-4 mb-8 flex-grow">
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                       <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Giống</p>
                          <p className="font-semibold text-gray-800">{selectedPet.breed || 'Đang cập nhật'}</p>
                       </div>
                       <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Nguồn gốc</p>
                          <p className="font-semibold text-gray-800">{selectedPet.origin || 'Chưa rõ'}</p>
                       </div>
                    </div>

                    <div>
                       <h3 className="text-lg font-bold text-gray-800 mb-2">Mô tả</h3>
                       <p className="text-gray-600 leading-relaxed text-sm">
                         {selectedPet.description || 'Chưa có thông tin mô tả chi tiết cho thú cưng này. Vui lòng liên hệ để biết thêm thông tin.'}
                       </p>
                    </div>
                 </div>

                 <button 
                   onClick={() => addToCart(selectedPet)}
                   className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-orange-500/40 flex items-center justify-center gap-2 mt-auto"
                 >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Thêm vào giỏ ngay
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Toast */}
      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: '' })} />
    </div>
  )
}

export default App