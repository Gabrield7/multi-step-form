import { z } from 'zod';

const userSchema = z.object({
    name: z.string()
        .min(1, 'This field is required')
        .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]{2,}(?:\s+[a-zA-ZÀ-ÖØ-öø-ÿ]{2,})+$/, { message: 'Invalid name' }),
    email: z.string()
        .min(1, 'This field is required')
        .regex(/\S+@\S+\.\S+/, { message: 'Invalid email address' }),
    phone: z.string()
        .min(1, 'This field is required')
        .regex(/^(?:\D*\d\D*){8,15}$/, { message: 'Invalid phone number' }),
}).superRefine(async (data, ctx) => {
    const { email, phone } = data;

    const storageRaw = localStorage.getItem('signature-storage-global');
    const storage = storageRaw ? JSON.parse(storageRaw) : null;
    
    const originalEmail = storage?.user?.email;
    const originalPhone = storage?.user?.phone;

    const emailChanged = email !== originalEmail;
    const phoneChanged = phone !== originalPhone;

    if (!emailChanged && !phoneChanged) return; 
    //const res = await fetch(`http://localhost:3000/users/check?email=${email}&phone=${phone}`);
    const res = await fetch(`/api/check?email=${email}&phone=${phone}`);
    const result = await res.json();
    
    if (result.success) {
        console.log('fetch');
        
        if (result.data.checkEmail) {
            ctx.addIssue({
                path: ['email'],
                code: z.ZodIssueCode.custom,
                message: 'This e-mail is already registered',
            });
        }
        if (result.data.checkPhone) {
            ctx.addIssue({
                path: ['phone'],
                code: z.ZodIssueCode.custom,
                message: 'This phone number is already registered',
            });
        }
    }
});

export type UserSchema = z.infer<typeof userSchema>

export { userSchema }