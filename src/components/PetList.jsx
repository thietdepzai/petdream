import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const PetList = () => {
    const [pets, setPets] = useState([]);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/pets');
                setPets(response.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách thú cưng", error);
            }
        };
        fetchPets();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Thú cưng đang chờ bạn</h2>
            {/* Sử dụng CSS Grid để hiển thị responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pets.map(pet => (
                    <div key={pet.pet_id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="p-5">
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-indigo-600 bg-indigo-200 mb-2">
                                {pet.category_name}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900">{pet.title}</h3>
                            <p className="text-gray-600 text-sm mt-1">Giống: {pet.breed}</p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-lg font-bold text-green-600">${pet.price}</span>
                                <button 
                                    onClick={() => addToCart(pet)}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                                >
                                    Thêm vào giỏ
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PetList;
