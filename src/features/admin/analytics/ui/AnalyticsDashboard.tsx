'use client';


import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

interface Order {
    id: string;
    total_price: number;
    status: string;
    created_at: string;
    city: string | null;
    payment_method: string | null;
    delivery_method: string | null;
}

interface Props {
    orders: Order[];
}

const STATUS_COLORS: Record<string, string> = {
    pending:    '#f59e0b',
    processing: '#3b82f6',
    completed:  '#10b981',
    cancelled:  '#ef4444',
};

const STATUS_LABELS: Record<string, string> = {
    pending:    'Pending',
    processing: 'Processing',
    completed:  'Completed',
    cancelled:  'Cancelled',
};

export const AnalyticsDashboard = ({ orders }: Props) => {
    const fmt = (n: number) => new Intl.NumberFormat('en-US').format(n);

    const totalRevenue = orders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + Number(o.total_price), 0);

    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'completed').length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const revenueByMonth: Record<string, number> = {};
    orders
        .filter(o => o.status !== 'cancelled')
        .forEach(o => {
            const month = new Date(o.created_at).toLocaleDateString('en-US', {
                month: 'short', year: '2-digit'
            });
            revenueByMonth[month] = (revenueByMonth[month] || 0) + Number(o.total_price);
        });

    const revenueChartData = Object.entries(revenueByMonth).map(([month, revenue]) => ({
        month,
        revenue: Math.round(revenue),
    }));

    const statusData = Object.entries(
        orders.reduce<Record<string, number>>((acc, o) => {
            acc[o.status] = (acc[o.status] || 0) + 1;
            return acc;
        }, {})
    ).map(([status, count]) => ({ status, count }));

    const cityCount = orders.reduce<Record<string, number>>((acc, o) => {
        const city = o.city || 'Unknown';
        acc[city] = (acc[city] || 0) + 1;
        return acc;
    }, {});
    const topCities = Object.entries(cityCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                    label="Total Revenue"
                    value={`$${fmt(totalRevenue)}`}
                    sub="excluding cancelled"
                />
                <KpiCard
                    label="Total Orders"
                    value={totalOrders}
                    sub={`${completedOrders} completed`}
                />
                <KpiCard
                    label="Avg. Order"
                    value={`$${fmt(Math.round(avgOrder))}`}
                    sub="per order"
                />
                <KpiCard
                    label="Pending"
                    value={pendingOrders}
                    sub="awaiting processing"
                    accent="amber"
                />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-base font-semibold text-gray-700 mb-4">Revenue by month</h2>
                {revenueChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={revenueChartData}>
                            <defs>
                                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#111827" stopOpacity={0.15} />
                                    <stop offset="95%" stopColor="#111827" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `$${v}`} />
                            <Tooltip formatter={(v) => [`$${new Intl.NumberFormat('en-US').format(Number(v))}`, 'Revenue']} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#111827"
                                strokeWidth={2}
                                fill="url(#revenueGrad)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <EmptyState text="No revenue data yet" />
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-base font-semibold text-gray-700 mb-4">Orders by status</h2>
                    {statusData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    dataKey="count"
                                    nameKey="status"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label={({ payload, percent }) => {
                                        const s = (payload as any)?.status as string | undefined;
                                        if (!s || percent == null) return '';
                                        return `${STATUS_LABELS[s] ?? s} ${(percent * 100).toFixed(0)}%`;
                                    }}
                                    labelLine={false}
                                >
                                    {statusData.map(({ status }) => (
                                        <Cell
                                            key={status}
                                            fill={STATUS_COLORS[status] ?? '#9ca3af'}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(v, _n, p) => [v, STATUS_LABELS[p.payload?.status] ?? p.payload?.status]} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <EmptyState text="No orders yet" />
                    )}
                    <div className="flex flex-wrap gap-3 mt-2">
                        {statusData.map(({ status, count }) => (
                            <div key={status} className="flex items-center gap-1.5 text-sm text-gray-600">
                                <span
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ background: STATUS_COLORS[status] ?? '#9ca3af' }}
                                />
                                {STATUS_LABELS[status] ?? status}: <b>{count}</b>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-base font-semibold text-gray-700 mb-4">Top cities</h2>
                    {topCities.length > 0 ? (
                        <div className="space-y-3">
                            {topCities.map(([city, count], i) => {
                                const max = topCities[0][1];
                                const pct = Math.round((count / max) * 100);
                                return (
                                    <div key={city}>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-gray-700 font-medium">{city}</span>
                                            <span className="text-gray-400">{count} orders</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gray-900 rounded-full transition-all"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <EmptyState text="No city data yet" />
                    )}
                </div>
            </div>
        </div>
    );
};


const KpiCard = ({
    label, value, sub, accent
}: {
    label: string;
    value: string | number;
    sub?: string;
    accent?: 'amber';
}) => (
    <div className={`bg-white rounded-2xl border p-5 ${accent === 'amber' ? 'border-amber-200' : 'border-gray-100'}`}>
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
        <p className={`text-2xl font-bold ${accent === 'amber' ? 'text-amber-500' : 'text-gray-900'}`}>
            {value}
        </p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
);

const EmptyState = ({ text }: { text: string }) => (
    <div className="flex items-center justify-center h-32 text-gray-400 text-sm">{text}</div>
);
