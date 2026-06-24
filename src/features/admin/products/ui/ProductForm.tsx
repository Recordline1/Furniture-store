'use client'

import { useForm } from 'react-hook-form';
import { supabase } from '@shared/api/supabase';

export const ProductForm = ({ product, onSuccess }: { product?: any, onSuccess: () => void }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: product || { name: '', price: 0, image_url: '' }
  });

  const onSubmit = async (data: any) => {
    if (data.imageFile?.[0]) {
      const file = data.imageFile[0];
      const { data: uploadData } = await supabase.storage
        .from('products')
        .upload(`public/${Date.now()}_${file.name}`, file);
      
      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(uploadData!.path);
      data.image_url = publicUrl;
    }

    const { error } = product 
      ? await supabase.from('products').update(data).eq('id', product.id)
      : await supabase.from('products').insert([data]);

    if (!error) onSuccess();
  };

  return (
    <form
    className='flex flex-col gap-4'
     onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register('name')} placeholder="Название" />
      <input type="file" {...register('imageFile')} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Сохранить</button>
    </form>          
  );
};