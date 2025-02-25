import { BodyPage } from '../../Components/BodyPage';
import './Plan.scss'

export const Plan = () => {
    return(
        <BodyPage
            title={'Select your plan'}
            subtitle={'You have the option of monthly or yearly billing.'}
        >
            <div className='addons__container'></div>
        </BodyPage>
    )
};