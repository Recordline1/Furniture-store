'use client'

import { useOrders } from '@entities/order/api/useOrders';
import { StatusSelect } from '@features/admin/ui/StatusSelect';

export const OrdersTable = () => {
    const { data: orders, isLoading, error } = useOrders();

    if (isLoading) return <div>Loading orders...</div>;
    if (error) return <div>Ошибка загрузки: {error.message}</div>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Клиент</th>
                        <th className="p-3">Сумма</th>
                        <th className="p-3">Статус</th>
                        <th className="p-3">Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-mono text-xs">{order.id.slice(0, 8)}...</td>
                            <td className="p-3">{order.customer_name}</td>
                            <td className="p-3">{order.total_price} грн</td>
                            <td className="p-3">
                                <StatusSelect status={order.status} orderId={order.id} />
                            </td>
                            <td className="p-3">{new Date(order.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};