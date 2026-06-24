'use client'

import { useTransition } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { updateOrderStatus } from '../api/updateOrderStatus';

const STATUSES = ['new', 'pending_payment', 'in_progress', 'shipped', 'delivered'];

export const StatusSelect = ({ orderId, status }: { orderId: string, status: string }) => {
    const [isPending, startTransition] = useTransition();
    const queryClient = useQueryClient();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        startTransition(async () => {
            await updateOrderStatus(orderId, e.target.value);
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        });
    };

    return (
        <select
            defaultValue={status}
            onChange={handleChange}
            disabled={isPending}
            className={`p-1 rounded text-xs border ${isPending ? 'opacity-50' : ''}`}
        >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
    );
};