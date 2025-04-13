//import { useEffect } from 'react';
import { BodyPage } from '@components/BodyPage';
import { FormField } from './FormField';
import { useNavigate } from 'react-router';
import { useUserStore } from '@stores/UserStore';
import { usePageValidationStore } from '@stores/PageStatusStore';
import { FieldPath, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserSchema } from './userSchemas';
import './Info.scss';

export const Info = () => {    
    const navigate = useNavigate();

    const { user, setUser } = useUserStore();
    const { pageStatus, validatePage } = usePageValidationStore();

    const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema),
        mode: 'onBlur',
        defaultValues: user
    });

    const handleBlur = async (field: FieldPath<UserSchema>) => { //validate when the field loses focus
        const currentUser = watch();

        const isValid = await trigger(field);

        if (isValid) setUser({[field]: currentUser[field]});
    };

    const onValid = async (data: UserSchema) => {
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
                    register={{ ...register('name', { onBlur: () => handleBlur('name') }) }} 
                    error={errors.name}
                />
                <FormField 
                    label='Email address' 
                    placeholder='e.g. stephenking@lorem.com' 
                    register={{ ...register('email', { onBlur: () => handleBlur('email') }) }} 
                    error={errors.email}
                />
                <FormField 
                    label='Phone Number' 
                    placeholder='e.g. +1 234 567 890' 
                    register={{ ...register('phone', { onBlur: () => handleBlur('phone') }) }} 
                    error={errors.phone}
                />
            </form>
        </BodyPage>
    )
};