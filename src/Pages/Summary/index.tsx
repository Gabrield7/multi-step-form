import { BodyPage } from '@components/BodyPage';
import { SubscriptionList } from './SubscriptionList';
import { PlanContext } from '@contexts/PlanContext';
import { Service } from './Service';
import { useContext } from 'react';
import './Summary.scss'

export const Summary = () => {
    const { plan } = useContext(PlanContext);
    
    return(
        <BodyPage
            title={'Finishing up'}
            subtitle={'Double check everything looks OK before confirming.'}
        >
            <section className='summary__container'>
                <SubscriptionList />
                <Service type='total' name={`Total (per ${plan.cycle})`} price={plan.price}/>
            </section>
        </BodyPage>
    )
};