import { Service } from '../Service';
import { availableAddons, availablePlans } from '@stores/PlanStore/availableServices';
import { usePlanStore } from '@stores/PlanStore';
import './SubscriptionList.scss';

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
                return (
                    <Service 
                        type='addon' 
                        key={addonName}
                        name={addonName} 
                        price={selectedAddon.price[cycle]}
                    />
                )
            })}
        </div>
    )
}