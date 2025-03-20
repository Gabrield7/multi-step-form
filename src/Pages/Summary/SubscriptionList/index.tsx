import { useContext } from 'react';
import { Service } from '../Service';
import { PlanContext } from '@contexts/PlanContext';
import { availableAddons, availablePlans } from '@contexts/PlanContext/Models';
import './SubscriptionList.scss';

export const SubscriptionList = () => {
    const { plan } = useContext(PlanContext);
    const { name, cycle, addons} = plan;
    
    return (
        <div className='subscription-list__container'>
            <Service 
                type='plan' 
                name={`${plan} (${cycle})`} 
                price={name? availablePlans[name].price[cycle]:0}
            />
            <span></span>
            {addons.map(addonName => {
                const selectedAddon = availableAddons[addonName]
                return <Service type='addon' name={addonName} price={selectedAddon.price[cycle]}/>
            })}
        </div>
    )
}