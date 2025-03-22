import { BodyPage } from '@components/BodyPage';
import { FormField } from './FormField';
import { useContext } from 'react';
import { UserContext } from '@contexts/UserContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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

type userSchema = z.infer<typeof userSchema>

export const Info = () => {
    const { user, setUser } = useContext(UserContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema),
        mode: 'onChange',
        defaultValues: {
            name: user.name,
            email: user.email,
            phone: user.phone,
        }
    });

    const onSubmit = (data: userSchema) => {
        setUser(data)
    };
    
    return(
        <BodyPage 
            title={'Personal info'}
            subtitle={'Please provide your name, email address and phone number.'}
        >
            <form 
                id='user-form' 
                className='info__container' 
                onSubmit={handleSubmit(onSubmit, () => console.log(user))}
            >
                <FormField 
                    label='Name' 
                    placeholder='e.g. Stephen King' 
                    register={register('name')}
                    error={errors.name}
                />
                <FormField 
                    label='Email address' 
                    placeholder='e.g. stephenking@lorem.com' 
                    register={register('email')}
                    error={errors.email}
                />
                <FormField 
                    label='Phone Number' 
                    placeholder='e.g. +1 234 567 890' 
                    register={register('phone')}
                    error={errors.phone}
                />
            </form>
        </BodyPage>
    )
};