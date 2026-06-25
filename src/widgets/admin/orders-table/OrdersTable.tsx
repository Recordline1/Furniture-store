'use client'

import { useState,Fragment  } from 'react';
import { useOrders } from '@entities/order/api/useOrders';
import { StatusSelect } from '@features/admin/ui/StatusSelect';
// import { StatusBadge } from '@features/admin/ui/StatusBadge';

const STATUSES = ['all', 'new', 'pending_payment', 'in_progress', 'shipped', 'delivered'];

export const OrdersTable = () => {
    const { data: orders, isLoading, error } = useOrders();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState('all');

    if (isLoading) return <div>Loading orders...</div>;
    if (error) return <div>Ошибка загрузки: {error.message}</div>;

    const filtered = filterStatus === 'all'
        ? orders
        : orders?.filter(o => o.status === filterStatus);

    return (
        <div>
            {/* Фильтр */}
            <div className="flex gap-2 flex-wrap mb-4">
                {STATUSES.map(s => (
                    <button
                        key={s}
                        onClick={() => setFilterStatus(s)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                            ${filterStatus === s
                                ? 'bg-gray-800 text-white border-gray-800'
                                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-500'
                            }`}
                    >
                        {s === 'all' ? 'Все' : s}
                    </button>
                ))}
            </div>

            {/* Таблица */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-3 text-gray-500 font-medium">ID</th>
                            <th className="p-3 text-gray-500 font-medium">Клиент</th>
                            <th className="p-3 text-gray-500 font-medium">Сумма</th>
                            <th className="p-3 text-gray-500 font-medium">Статус</th>
                            <th className="p-3 text-gray-500 font-medium">Дата</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered?.map((order) => (
                            <Fragment key={order.id}>
                                <tr
                                    key={order.id}
                                    onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                                    className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                    <td className="p-3 font-mono text-xs text-gray-400">{order.id.slice(0, 8)}…</td>
                                    <td className="p-3 font-medium">{order.customer_name}</td>
                                    <td className="p-3">{order.total_price} грн</td>
                                    <td className="p-3" onClick={e => e.stopPropagation()}>
                                        <StatusSelect status={order.status} orderId={order.id} />
                                    </td>
                                    <td className="p-3 text-gray-500">
                                        {new Date(order.created_at).toLocaleDateString('uk-UA')}
                                    </td>
                                </tr>

                                {/* Раскрытые order_items */}
                                {expandedId === order.id && (
                                    <tr key={`${order.id}-items`} className="bg-gray-50">
                                        <td colSpan={5} className="px-6 py-3">
                                            <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Состав заказа</p>
                                            <div className="flex flex-col gap-1">
                                                {order.order_items?.map((item: any, i: number) => (
                                                    <div key={i} className="flex justify-between text-sm">
                                                        <span>{item.products?.name ?? '—'} × {item.quantity}</span>
                                                        <span className="text-gray-500">{item.price_at_purchase * item.quantity} грн</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};