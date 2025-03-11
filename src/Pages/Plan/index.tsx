import { BodyPage } from '@components/BodyPage';
import { PlanButton } from './PlanButton';
import { Switch } from './Switch';
import './Plan.scss';

export const Plan = () => {
    return(
        <BodyPage
            title={'Select your plan'}
            subtitle={'You have the option of monthly or yearly billing.'}
        >
            <div className='plan__container'>
                <PlanButton plan={'Arcade'}/>
                <PlanButton plan={'Advanced'}/>
                <PlanButton plan={'Pro'}/>

                <Switch />
            </div>
        </BodyPage>
    )
};