import { Service } from '../Service';
import './SubscriptionList.scss';

export const SubscriptionList = () => {
    return (
        <div className='subscription-list__container'>
            <Service type='plan' name='Arcade (monthly)' price={9}/>
            <span></span>
            <Service type='addon' name='Online service' price={1}/>
            <Service type='addon' name='Larger storage' price={2}/>
        </div>
    )
}