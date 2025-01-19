import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // جلب البيانات من الـ API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.post('https://trendy-vibes-server.vercel.app/ordersadmin'); // ضع رابط الـ API هنا
        setOrders(response.data);
      } catch (error) {
        toast.error('فشل في جلب الطلبات');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-blue-500">جارٍ تحميل الطلبات...</div>
      </div>
    );
  }

  const View = (id) => {
    navigate('/oneorder', { state: id });
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">قائمة الطلبات</h2>
      {orders.length === 0 ? (
        <p className="text-center text-xl text-gray-600">لا توجد طلبات حالياً</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-indigo-600 mb-4">Customer Name: {order.customerName}</h3>
                <p className="text-gray-600 mb-2"><strong>Phone:</strong> {order.customerPhone}</p>
                <p className="text-gray-600 mb-2"><strong>Additional Phone:</strong> {order.additionalPhone}</p>
                <p className="text-gray-600 mb-2"><strong>Address:</strong> {order.address}</p>
                <p className="text-gray-600 mb-2"><strong>Governorate:</strong> {order.governorate}</p>
                <p className="text-gray-600 mb-4"><strong>Notes:</strong> {order.notes}</p>
                <p className={`text-sm font-semibold ${order.statues === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>
                  <strong>Status:</strong> {order.statues}
                </p>
              </div>
              <div className="px-6 pb-6 pt-4">
                <button onClick={()=>View(order._id)} className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  Open Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
