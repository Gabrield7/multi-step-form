import { Service } from '../Service';
import { availableAddons, availablePlans } from '@contexts/PlanContext/Models';
import './SubscriptionList.scss';
import { usePlanStore } from '@stores/PlanStore';

export const SubscriptionList = () => {
    const { plan } = usePlanStore();
    const { name, cycle, addons } = plan;
    
    return (
        <div className='subscription-list__container'>
            <Service 
                type='plan' 
                name={`${name} (${cycle})`} 
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