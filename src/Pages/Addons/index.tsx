import { BodyPage } from '@components/BodyPage';
import { AddonButton } from './AddonButton';
import { useForm } from 'react-hook-form';
import { PageValidationContext } from '@contexts/PageValidationContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import './Addons.scss';

export const Addons = () => {
    const { validatePage } = useContext(PageValidationContext);
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();

    const onValid = () => {
        validatePage('/summary', true);
        navigate('/summary');
    };
    
    return(
        <BodyPage 
            title={'Pick add-ons'}
            subtitle={'Add-ons help enhance your game experience.'}
        >
            <form 
                id='addons-form' 
                onSubmit={handleSubmit(onValid)}
                className='addons__container'
            >
                <AddonButton addonName='Online service' register={register('addons')}/>
                <AddonButton addonName='Larger storage' register={register('addons')}/>
                <AddonButton addonName='Customizable profile' register={register('addons')}/>
            </form>
        </BodyPage>
    )
};