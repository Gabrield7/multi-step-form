import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { FieldPath, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BodyPage } from '@components/BodyPage';
import { FormField } from './FormField';
import { useUserStore } from '@stores/UserStore';
import { usePageValidationStore } from '@stores/PageStatusStore';
import { setUserError, userSchema, UserSchema } from '@utils/userValidation';
import { LoadingContext } from '@contexts/LoadingContext';
import { SpinningLoading } from '@components/spinningLoading';
import { ConfirmationPage } from '@components/ConfirmationPage';
import { useTimeout } from '@hooks/useTimeout';
import './Info.scss';

export const Info = () => {
    const navigate = useNavigate();
    const { user, setUser } = useUserStore();
    const { pageStatus, validatePage } = usePageValidationStore();
    const { setIsLoading, isLoading } = useContext(LoadingContext);
    const [reqFail, setReqFail] = useState(false);
    const firstRun = useRef(true);

    const { register, handleSubmit, watch, setError, trigger, formState: { errors, isDirty } } = useForm({
        resolver: zodResolver(userSchema),
        mode: 'onTouched',
        defaultValues: user
    });

    // Handle field blur: validate and update store
    const handleBlur = async (field: FieldPath<UserSchema>) => { //validate when the field loses focus
        if(!isDirty) return;
        const currentUser = watch(field);
        
        const isValid = await trigger(field);
        
        if(isValid) {
            setUser({ [field]: currentUser });
        }
    };

    // Timeout failure after 30s
    useTimeout(() => {
        setIsLoading(false);
        setReqFail(true);
    }, 30000, isLoading);

    useEffect(() => {
        const storage = localStorage.getItem('signature-storage-global');
        if(!storage) return;

        const validate = async () => {
            setIsLoading(true);

            const dataToValidate = {
                ...(user.email && { email: user.email }),
                ...(user.phone && { phone: user.phone }),
            };
            
            const result = userSchema.safeParse(user);

            if(firstRun.current){
                if(Object.keys(dataToValidate).length !== 0){
                    await setUserError(result, dataToValidate, setError);
                }

                firstRun.current = false;
            }

            setIsLoading(false);
        }

        validate();
    }, [setIsLoading, firstRun, setError, user, trigger]);

    const onValid = async (data: UserSchema) => {
        setIsLoading(true);
        // Synchronous validation using the schema
        const result = userSchema.safeParse(data);

        const errors = await setUserError(result, data, setError);
        if (errors) {
            setIsLoading(false);
            return; // If any error was set, stop the flow
        }
        
        // If all validations pass, update the state and navigate to the next page
        const formChanged = JSON.stringify(data) !== JSON.stringify(user);

        if (formChanged) setUser(data);
        if (!pageStatus['/plan']) validatePage('/plan', true);
        
        setIsLoading(false);
        navigate('/plan');
    };
    
    // Render conditions
    if (isLoading) return <BodyPage><SpinningLoading /></BodyPage>;
    if (reqFail) return <ConfirmationPage success={false} status={500} message="This action is taking too long" infoPage />;

    return (
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
    );
};