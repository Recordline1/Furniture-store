import {CheckoutForm} from '@features/checkout/ui/CheckoutForm';


export default function CheckoutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-10">
        <CheckoutForm />
      </div>
    </main>
  );
}