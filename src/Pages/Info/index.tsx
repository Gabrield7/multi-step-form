import { BodyPage } from '@components/BodyPage';
import { FormField } from './FormField';
import { useNavigate } from 'react-router';
import { useUserStore } from '@stores/UserStore';
import { usePageValidationStore } from '@stores/PageStatusStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import './Info.scss';

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
});

type UserSchema = z.infer<typeof userSchema>

export const Info = () => {    
    const navigate = useNavigate();

    const { user, setUser } = useUserStore();
    const { pageStatus, validatePage } = usePageValidationStore();

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema),
        mode: 'onChange',
        defaultValues: user
    });

    useEffect(() => reset(user), [user, reset]); //reset the default values when the page reloads

    const handleBlur = () => setUser(watch()); //validate when the field loses focus

    const onValid = (data: UserSchema) => {
        const formChanged = JSON.stringify(data) !== JSON.stringify(user);

        if(formChanged) setUser(data);
        if(!pageStatus['/plan']) validatePage('/plan', true);

        navigate('/plan');
    };
    
    return(
        <BodyPage 
            title={'Personal info'}
            subtitle={'Please provide your name, email address and phone number.'}
        >
            <form 
                id='info-form' 
                className='info__container' 
                onSubmit={handleSubmit(onValid)}
            >
                <FormField 
                    label='Name' 
                    placeholder='e.g. Stephen King' 
                    register={{ ...register('name', { onBlur: handleBlur }) }} 
                    error={errors.name}
                />
                <FormField 
                    label='Email address' 
                    placeholder='e.g. stephenking@lorem.com' 
                    register={{ ...register('email', { onBlur: handleBlur }) }} 
                    error={errors.email}
                />
                <FormField 
                    label='Phone Number' 
                    placeholder='e.g. +1 234 567 890' 
                    register={{ ...register('phone', { onBlur: handleBlur }) }} 
                    error={errors.phone}
                />
            </form>
        </BodyPage>
    )
};