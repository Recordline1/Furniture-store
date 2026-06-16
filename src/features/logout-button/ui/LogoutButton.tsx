'use client'
import { supabase } from '@/shared/api/supabase';
import { useRouter } from 'next/navigation';

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/auth');
  };

  return (
    <button
      className="bg-gray-500 text-white p-2 rounded-xl disabled:bg-gray-400 cursor-pointer"
      onClick={handleLogout}>
      Log Out
    </button>);
}