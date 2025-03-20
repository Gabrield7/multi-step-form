import { useContext } from 'react';
import { Service } from '../Service';
import { SignatureContext } from '@contexts/Signature/SignatureContext';
import { availableAddons, availablePlans } from '@contexts/Signature/Models';
import './SubscriptionList.scss';

export const SubscriptionList = () => {
    const { plan, addons, cycle } = useContext(SignatureContext);
    
    return (
        <div className='subscription-list__container'>
            <Service type='plan' name={`${plan} (${cycle})`} price={plan? availablePlans[plan].price[cycle]:0}/>
            <span></span>
            {addons.map(addonName => {
                const selectedAddon = availableAddons[addonName]
                return <Service type='addon' name={addonName} price={selectedAddon.price[cycle]}/>
            })}
        </div>
    )
}