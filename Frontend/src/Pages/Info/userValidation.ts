import { SafeParseReturnType } from 'zod';
import { UserSchema } from './index';
import { UseFormSetError } from 'react-hook-form';

export interface CheckUserResponse {
    emailError?: string;
    phoneError?: string;
}

export const checkUser = async (email: string, phone: string): Promise<CheckUserResponse> => {
    const errors: CheckUserResponse = {};

    const res = await fetch(`api/check?email=${email}&phone=${phone}`);
    const result = await res.json();
    
    if (result.success) {
        if (result.data.checkEmail) {
            errors.emailError = 'This email is already registered';
        }
        if (result.data.checkPhone) {
            errors.phoneError = 'This phone number is already registered';
        }
    }

    return errors;
};

export const setUserError = async (
    result: SafeParseReturnType<UserSchema, UserSchema>, 
    data: UserSchema, 
    setError: UseFormSetError<UserSchema>
) => {    
    if (!result.success) { //set error manually
        result.error.errors.forEach((error) => {
            const field = error.path[0];
            const message = error.message;
    
            setError(field as keyof UserSchema, {
                type: 'manual',
                message,
            });
        });
        return; // Stop flow if there is a format error
    }
    
    // Execute the modular asynchronous validation
    const { email, phone } = data;
    const errors = await checkUser(email, phone);
    
    if (errors.emailError) {
        setError('email', {
            type: 'manual',
            message: errors.emailError,
        });
    }

    if (errors.phoneError) {
        setError('phone', {
            type: 'manual',
            message: errors.phoneError,
        });
    }
    
    // If any error was set, stop the flow
    if (errors.emailError || errors.phoneError) {
        return;
    }
}

