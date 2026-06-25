// src/app/(admin)/admin/analytics/page.tsx
import { createClient } from '@/shared/api/server';
import { AnalyticsDashboard } from '@/features/admin/analytics/ui/AnalyticsDashboard';

export default async function AnalyticsPage() {
    const supabase = await createClient();

    const { data: orders } = await supabase
        .from('orders')
        .select('id, total_price, status, created_at, city, payment_method, delivery_method')
        .order('created_at', { ascending: true });

    return <AnalyticsDashboard orders={orders || []} />;
}
