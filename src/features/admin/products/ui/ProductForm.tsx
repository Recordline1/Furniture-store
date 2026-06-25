'use client'

import { useForm } from 'react-hook-form';
import { supabase } from '@shared/api/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Image from 'next/image';
import { FurnitureProduct } from '@shared/types';

type FormValues = {
  name: string;
  price: number;
  old_price?: number;
  slug: string;
  category: string;
  label_text?: string;
  label_variant?: 'new' | 'sale' | 'hot' | '';
  imageFile?: FileList;
}

const CATEGORIES = ['sofas', 'tables', 'dining', 'outdoor', 'storage'];

interface Props {
  product?: FurnitureProduct | null;
  onSuccess: () => void;
}

export const ProductForm = ({ product, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string>(product?.image_url || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: product?.name || '',
      price: product?.price || 0,
      old_price: product?.old_price,
      slug: product?.slug || '',
      category: product?.category || 'sofas',
      label_text: product?.label?.text || '',
      label_variant: product?.label?.variant || '',
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      let image_url = product?.image_url || '';

      if (data.imageFile?.[0]) {
        const file = data.imageFile[0];
        const ext = file.name.split('.').pop();
        const path = `public/${Date.now()}.${ext}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('products')
          .upload(path, file, { upsert: true });

        if (uploadError) throw new Error('Error uploading image: ' + uploadError.message);

        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(uploadData.path);

        image_url = publicUrl;
      }

      const payload = {
        name: data.name,
        price: Number(data.price),
        old_price: data.old_price ? Number(data.old_price) : null,
        slug: data.slug,
        category: data.category,
        image_url,
        label_text: data.label_text || '',
        label_variant: data.label_variant || '',
      };

      const { error: dbError } = product
        ? await supabase.from('products').update(payload).eq('id', product.id)
        : await supabase.from('products').insert([payload]);

      if (dbError) throw new Error(dbError.message);

      await queryClient.invalidateQueries({ queryKey: ['products'] });
      onSuccess();

    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Photo</label>
        {preview && (
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100">
            <Image src={preview} alt="preview" fill className="object-cover" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          {...register('imageFile')}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
          className="text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Name *</label>
        <input
          {...register('name', { required: 'Name is required' })}
          placeholder="Product name"
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Slug *</label>
        <input
          {...register('slug', { required: 'Slug is required' })}
          placeholder="product-slug"
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.slug && <p className="text-red-500 text-xs">{errors.slug.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Price *</label>
          <input
            type="number"
            {...register('price', { required: true, min: 0 })}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Old price</label>
          <input
            type="number"
            {...register('old_price', { min: 0 })}
            placeholder="Optional"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Category *</label>
        <select
          {...register('category', { required: true })}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Label text</label>
          <input
            {...register('label_text')}
            placeholder="New / Sale"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Label type</label>
          <select
            {...register('label_variant')}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">— none —</option>
            <option value="new">new</option>
            <option value="sale">sale</option>
          </select>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 rounded-xl px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white font-medium py-2.5 px-4 rounded-xl transition-colors"
      >
        {isSubmitting ? 'Saving...' : product ? 'Save changes' : 'Add product'}
      </button>
    </form>
  );
};