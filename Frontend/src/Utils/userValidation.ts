import { z, SafeParseReturnType } from 'zod';
import { UseFormSetError } from 'react-hook-form';

interface CheckUserResponse {
    emailError?: string;
    phoneError?: string;
}

export const userSchema = z.object({
    name: z.string()
        .min(1, 'This field is required')
        .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]{2,}(?:\s+[a-zA-ZÀ-ÖØ-öø-ÿ]{2,})+$/, { message: 'Invalid user name.' }),
    email: z.string()
        .min(1, 'This field is required')
        .regex(/\S+@\S+\.\S+/, { message: 'Invalid email address.' }),
    phone: z.string()
        .min(1, 'This field is required')
        .regex(/^(?:\D*\d\D*){8,15}$/, { message: 'Invalid phone number.' }),
});

export type UserSchema = z.infer<typeof userSchema>

export const checkUserData = async (email?: string, phone?: string): Promise<CheckUserResponse> => {
    const errors: CheckUserResponse = {};
    if(!email && !phone) return errors;

    const params = new URLSearchParams();
    if (email) params.append('email', email);
    if (phone) params.append('phone', phone);

    const res = await fetch(`/api/check?${params.toString()}`);
    const result = await res.json();   
    
    if (result.success) {
        if (result.data.checkEmail) {
            errors.emailError = 'This email is already registered.';
        }
        if (result.data.checkPhone) {
            errors.phoneError = 'This phone number is already registered.';
        }
    };

    return errors;
};

export const setUserError = async (
    result: SafeParseReturnType<UserSchema, UserSchema>, 
    data: Partial<UserSchema>, 
    setError: UseFormSetError<UserSchema>
): Promise<boolean> => {    
    let error = false;

    if (!result.success) { //set error manually
        error = true;
        result.error.errors.forEach((error) => {
            const field = error.path[0];
            const message = error.message;
    
            setError(field as keyof UserSchema, {
                type: 'manual',
                message,
            });
        });
    };
    
    // Execute the modular asynchronous validation
    const { email, phone } = data;
    //if(email ===)
    const errors = await checkUserData(email as string, phone as string);
    
    if (errors.emailError) {
        error = true;
        setError('email', {
            type: 'manual',
            message: errors.emailError,
        });
    };

    if (errors.phoneError) {
        error = true;
        setError('phone', {
            type: 'manual',
            message: errors.phoneError,
        });
    };
    
    return error;
}

