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
                <PlanButton planName={'Arcade'}/>
                <PlanButton planName={'Advanced'}/>
                <PlanButton planName={'Pro'}/>

                <Switch />
            </div>
        </BodyPage>
    )
};