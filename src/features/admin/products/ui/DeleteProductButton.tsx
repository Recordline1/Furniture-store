'use client'

import { supabase } from '@shared/api/supabase';
import { Trash2 } from 'lucide-react';

export const DeleteProductButton = ({ id, name }: { id: string, name: string }) => {
  const handleDelete = async () => {
    if (!confirm(`Remove "${name}"?`)) return;

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) alert('Ошибка удаления: ' + error.message);
    else window.location.reload(); // Или invalidateQueries
  };

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
      <Trash2 size={18} />
    </button>
  );
};