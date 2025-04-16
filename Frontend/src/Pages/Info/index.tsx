import { zodResolver } from '@hookform/resolvers/zod';
import { FieldPath, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { BodyPage } from '@components/BodyPage';
import { FormField } from './FormField';
import { useUserStore } from '@stores/UserStore';
import { usePageValidationStore } from '@stores/PageStatusStore';
import { setUserError, userSchema, UserSchema } from '@utils/userValidation';
import { LoadingContext } from '@contexts/LoadingContext';
import { SpinningLoading } from '@components/spinningLoading';
import './Info.scss';

export const Info = () => {    
    const navigate = useNavigate();

    const { user, setUser } = useUserStore();
    const { pageStatus, validatePage } = usePageValidationStore();
    const { setIsLoading, isLoading } = useContext(LoadingContext);
    const [firstValidation, setFirstValidation] = useState(true);

    const { register, handleSubmit, watch, setError, trigger, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema),
        mode: 'onBlur',
        defaultValues: user
    });

    const handleBlur = async (field: FieldPath<UserSchema>) => { //validate when the field loses focus
        const currentUser = watch(field);
        
        const isValid = await trigger(field);
        
        if(isValid) {
            setUser({ [field]: currentUser });
        }
    };

    useEffect(() => {
        const validate = async () => {
            setIsLoading(true);
            const dataToValidate = {
                email: user.email,
                phone: user.phone
            }

            const result = userSchema.safeParse(user);

            if(firstValidation){
                await trigger();
                await setUserError(result, dataToValidate, setError);
                setFirstValidation(false);  
            }
            setIsLoading(false);
        }

        validate();
    }, [setIsLoading, setFirstValidation, firstValidation, setError, user, trigger]);

    const onValid = async (data: UserSchema) => {
        // Synchronous validation using the schema
        const result = userSchema.safeParse(data);

        setIsLoading(true);
        const errors = await setUserError(result, data, setError);
        setIsLoading(false);

        if (errors) return; // If any error was set, stop the flow
      
        // If all validations pass, update the state and navigate to the next page
        const formChanged = JSON.stringify(data) !== JSON.stringify(user);
        if (formChanged) setUser(data);
        if (!pageStatus['/plan']) validatePage('/plan', true);
      
        navigate('/plan');
    };
    
    return isLoading?
        (<BodyPage><SpinningLoading /></BodyPage>) :
        (<BodyPage 
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