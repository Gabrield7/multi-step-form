import { BodyPage } from '../../Components/BodyPage';
import { SubscriptionList } from './SubscriptionList';
import { Service } from './Service';
import './Summary.scss'

export const Summary = () => {
    return(
        <BodyPage
            title={'Finishing up'}
            subtitle={'Double check everything looks OK before confirming.'}
        >
            <div className='summary__container'>
                <SubscriptionList />
                <Service type='total' name='Total (per month)' price={12}/>
            </div>
        </BodyPage>
    )
};