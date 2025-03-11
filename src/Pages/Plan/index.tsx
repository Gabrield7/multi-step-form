import { BodyPage } from '../../Components/BodyPage';
import { PlanButton } from './PlanButton';
import { Switch } from './Switch';
import { SignatureContextProvider } from '../../Contexts/SignatureContext';
import { availablePlans } from '../../Contexts/Models';
import './Plan.scss';

export const Plan = () => {
    return(
        <BodyPage
            title={'Select your plan'}
            subtitle={'You have the option of monthly or yearly billing.'}
        >
            <SignatureContextProvider>
                <div className='plan__container'>
                    <PlanButton plan={availablePlans['Arcade']}/>
                    <PlanButton plan={availablePlans['Advanced']}/>
                    <PlanButton plan={availablePlans['Pro']}/>

                    <Switch />
                </div>
            </SignatureContextProvider>
        </BodyPage>
    )
};