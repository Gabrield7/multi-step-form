import { BodyPage } from '@components/BodyPage';
import { SubscriptionList } from './SubscriptionList';
import { Service } from './Service';
import { usePlanStore } from '@stores/PlanStore';
import './Summary.scss'

export const Summary = () => {
    const { plan } = usePlanStore();

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