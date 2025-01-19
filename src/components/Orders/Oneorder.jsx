import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';

export default function OneOrder() {
    const location = useLocation();
    const id = location.state;
    const [order, setOrder] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`https://trendy-vibes-server.vercel.app/order/${id}`); // ضع رابط الـ API هنا
                setOrder(response.data);
                setStatus(response.data.status || ''); // إذا كان الـ status موجودًا في order
            } catch (error) {
                toast.error('فشل في جلب الطلبات');
            }
        };

        fetchOrder();
    }, [id]);

    const edit = async (id, status) => {
        if (!status) {
            toast.error('يرجى تحديد الحالة');
            return;
        }

        try {
            const response = await axios.put(
                `https://trendy-vibes-server.vercel.app/order/${id}`,
                { status } // إرسال قيمة status في جسم الطلب
            );
            window.location.reload();
            console.log('Response:', response); // إضافة سجل لتتبع الاستجابة
            setOrder(response.data); // تأكد من أن setOrder معرف مسبقًا لتحديث الحالة
            toast.success('تم تعديل الطلب بنجاح');
        } catch (error) {
            console.error('Error:', error); // إضافة سجل للأخطاء
            toast.error('فشل في تعديل الطلب');
        }
    };

    if (!order) {
        return <div className="text-center text-lg text-gray-500 mt-10">جارٍ تحميل الطلب...</div>;
    }

    return (
        <div className="container mx-auto mt-12 px-6">
            {/* تفاصيل الطلب */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg rounded-xl p-8 mb-8">
                <h2 className="text-4xl font-bold text-white text-center mb-6">Details Order</h2>
                <div className="space-y-4 text-lg text-white">
                    <p><strong>Customer Name : </strong> {order.customerName}</p>
                    <p><strong>Phone : </strong> {order.customerPhone}</p>
                    <p><strong>Additional Phone : </strong> {order.additionalPhone}</p>
                    <p><strong>Address : </strong> {order.address}</p>
                    <p><strong>Governorate : </strong> {order.governorate}</p>
                    <p><strong>Notes : </strong> {order.notes}</p>
                    <p>
                        <strong>Status : </strong>
                        {order.status}
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="ml-4 p-2 rounded bg-indigo-600 border border-gray-300 text-black"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Complete">Complete</option>
                        </select>

                        <button
                            onClick={() => edit(order._id, status)}
                            className="inline-block px-6 py-1 text-black bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ml-4"
                        >
                            Submit
                        </button>
                    </p>
                </div>
            </div>

            {/* المنتجات المرفقة بالطلب */}
            <div className="bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">المنتجات المرفقة بالطلب</h2>
                <div className="space-y-6">
                    {order.products.map((product, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all">
                            <h3 className="text-3xl font-semibold text-indigo-600">{product.name}</h3>
                            <p className="text-lg"><strong>Description : </strong> {product.description}</p>
                            <p className="text-lg"><strong>Price Before : </strong> {product.priceBefore}</p>
                            <p className="text-lg"><strong>Price After : </strong> {product.priceAfter}</p>
                            <p className="text-lg"><strong>Department : </strong> {product.department}</p>
                            <p className="text-lg"><strong>Link Product : </strong> <a
                                href={product.productUrl}
                                className="inline-block px-6 py-1  text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                                target="_blank"
                            >
                                رابط
                            </a>
                            </p>
                            <p className="text-lg"><strong>Size : </strong> {product.size}</p>
                            <p className="text-lg"><strong>Color : </strong> {product.color}</p>

                            {/* عرض الـ Slider للصور مع حجم ثابت داخل المضمون */}
                            {product.imageUrls && product.imageUrls.length > 0 ? (
                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {product.imageUrls.map((imageUrl, idx) => (
                                        <div key={idx} className="flex justify-center items-center bg-gray-100 p-4 rounded-lg">
                                            <img
                                                src={imageUrl}
                                                alt={`Product image ${idx + 1}`}
                                                className="w-full h-auto max-h-72 object-cover rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 mt-4">لا توجد صور للمنتج</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
