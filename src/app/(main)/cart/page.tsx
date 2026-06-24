
import { CartList } from '@/widgets/cart/ui/CartList';

export default function CartPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="max-w-2xl mx-auto">
        <CartList />
      </div>
    </main>
  );
}