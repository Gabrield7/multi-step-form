import { BodyPage } from '@components/BodyPage';
import { PlanButton } from './PlanButton';
import { Switch } from './Switch';
import { useContext } from 'react';
import { PageValidationContext } from '@contexts/PageValidationContext';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import './Plan.scss';
import { PlanContext } from '@contexts/PlanContext';
//import { useBlockedNavigation } from '@contexts/PageValidationContext/redirect';

const planSchema = z.object({
    plan: z.enum(['Arcade', 'Advanced', 'Pro']).nullable().refine(
        (value) => value !== null, 
        { message: "Select a plan first" }
    )
});

type PlanSchema = z.infer<typeof planSchema>

export const Plan = () => {
    //useBlockedNavigation()
    
    const { setPlan } = useContext(PlanContext);
    const { validatePage } = useContext(PageValidationContext);
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors } } = useForm({ //, 
        resolver: zodResolver(planSchema),
    });

    const onValid = (data: PlanSchema) => {
        setPlan('name', data.plan);
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
                <PlanButton planName={'Arcade'} register={register('plan')}/>
                <PlanButton planName={'Advanced'} register={register('plan')}/>
                <PlanButton planName={'Pro'} register={register('plan')}/>

                {errors.plan && <span className='error-message'>{errors.plan?.message}</span>}

                <Switch />
            </form>
        </BodyPage>
    )
};