import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ revenueData: {}, categoryStats: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dashboard/stats');
                setStats(response.data);
            } catch (error) {
                console.error("Lỗi tải dashboard", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="text-center mt-10">Đang tải dữ liệu...</div>;

    const { total_revenue, total_orders } = stats.revenueData;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-emerald-500">
                    <p className="text-sm text-gray-500 font-semibold uppercase">Tổng Doanh Thu</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                        ${Number(total_revenue || 0).toLocaleString()}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                    <p className="text-sm text-gray-500 font-semibold uppercase">Tổng Số Đơn Hàng</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">
                        {total_orders || 0}
                    </p>
                </div>
            </div>

            {/* Bảng thống kê theo danh mục */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-bold text-gray-800">Thú cưng theo danh mục</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Danh mục</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Số lượng</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {stats.categoryStats.map((cat, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-900">{cat.category_name}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                    <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                                        {cat.pet_count}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
