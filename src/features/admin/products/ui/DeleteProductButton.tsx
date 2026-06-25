'use client'
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@shared/api/supabase';
import { Trash2 } from 'lucide-react';

export const DeleteProductButton = ({ id, name }: { id: string, name: string }) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (!confirm(`Remove "${name}"?`)) return;

    const { error } = await supabase.from('products').delete().eq('id', id);
    
    if (error) {
      alert('Error deleting product: ' + error.message);
    } else {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  };

  return (
    <button onClick={handleDelete} className="text-gray-500 hover:text-gray-900">
      <Trash2 size={18} />
    </button>
  );
};