import { BodyPage } from '../../Components/BodyPage';
import { PlanButton } from './PlanButton';
import './Plan.scss'

export const Plan = () => {
    return(
        <BodyPage
            title={'Select your plan'}
            subtitle={'You have the option of monthly or yearly billing.'}
        >
            <div className='plan__container'>
                <PlanButton iconPath='/assets/images/icon-arcade.svg' title='Arcade' price={90}/>
                <PlanButton iconPath='/assets/images/icon-advanced.svg' title='Advanced' price={120}/>
                <PlanButton iconPath='/assets/images/icon-pro.svg' title='Pro' price={150}/>
            </div>
        </BodyPage>
    )
};