import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z.string().min(2, 'The name is too short'),
  phone: z.string().regex(/^[\d\s\+\(\)\-]{7,}$/, 'Invalid number'),
  email: z.string().email('Invalid email'),
  deliveryMethod: z.string().min(1, 'Choose delivery method'),
  payment: z.string().min(1, 'Choose payment method'),
  comment: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
}).superRefine((data, ctx) => {

  if (data.deliveryMethod !== 'pickup') {
    if (!data.city || data.city.trim().length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Please specify the city', path: ['city'] });
    }
    if (!data.address || data.address.trim().length < 5) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Please specify the address', path: ['address'] });
    }
  }
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;