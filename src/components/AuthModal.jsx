import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    
    const { login, register } = useContext(AuthContext);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        let res;
        if (isLogin) {
            res = await login(username, password);
        } else {
            res = await register(username, password, role);
        }

        if (res.success) {
            onClose();
            setUsername('');
            setPassword('');
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isLogin ? '👋 Đăng Nhập' : '✨ Tạo Tài Khoản'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                            {error}
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
                        <input 
                            type="text" required
                            value={username} onChange={e => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                            placeholder="Nhập username"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                        <input 
                            type="password" required
                            value={password} onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                            placeholder="Nhập password"
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Loại tài khoản</label>
                            <select 
                                value={role} onChange={e => setRole(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                            >
                                <option value="user">Người dùng (Mua hàng)</option>
                                <option value="admin">Quản trị viên (Admin)</option>
                            </select>
                        </div>
                    )}
                    
                    <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition shadow-orange-500/30 shadow-lg mt-2">
                        {isLogin ? 'Đăng Nhập Ngay' : 'Đăng Ký'}
                    </button>
                </form>

                <div className="bg-gray-50 p-6 text-center text-sm text-gray-600">
                    {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
                    <button 
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        className="font-bold text-orange-600 hover:text-orange-700 transition"
                    >
                        {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
