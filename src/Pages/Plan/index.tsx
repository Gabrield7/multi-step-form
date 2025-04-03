import { BodyPage } from '@components/BodyPage';
import { PlanButton } from './PlanButton';
import { Switch } from './Switch';
import { useNavigate } from 'react-router';
import { usePageValidationStore } from '@stores/PageStatusStore';
import { useForm } from 'react-hook-form';
import './Plan.scss';

export const Plan = () => {
    const navigate = useNavigate();

    const { validatePage } = usePageValidationStore();
    
    const { handleSubmit } = useForm();

    const onValid = () => {
        validatePage('/addons', true);
        navigate('/addons');
    };
    
    return(
        <BodyPage
            title={'Select your plan'}
            subtitle={'You have the option of monthly or yearly billing.'}
        >
            <form 
                id='plan-form' 
                className='plan__container'
                onSubmit={handleSubmit(onValid)}
            >
                <PlanButton planName="Arcade" />
                <PlanButton planName="Advanced" />
                <PlanButton planName="Pro" />

                <Switch />
            </form>
        </BodyPage>
    )
};