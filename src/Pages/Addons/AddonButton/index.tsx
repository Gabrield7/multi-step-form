import { useState, useContext } from 'react';
import { availableAddons } from '@contexts/PlanContext/Models';
import { PlanContext } from '@contexts/PlanContext';
import clsx from 'clsx';
import './AddonButton.scss';

interface IAddonProps {
    addonName: 'Online service' | 'Larger storage' | 'Customizable profile'
}

export const AddonButton: React.FC<IAddonProps> = ({ addonName }) => {
    const [hover, setHover] = useState(false);
    const { plan, setAddons } = useContext(PlanContext);
    
    const selectedAddon = availableAddons[addonName];

    return (
        <div className={clsx('addon__container', { 'checked': plan.addons.includes(addonName) || hover })}>
            <label className='custom-checkbox'>
                <input 
                    type='checkbox'
                    onChange={() => setAddons(addonName)}
                    checked={plan.addons.includes(addonName)}
                />
                <span 
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                />
            </label>
            <div>
                <h2>{addonName}</h2>
                <p>{selectedAddon.description}</p>
            </div>
            <span className='extra'>{`${
                plan.cycle === 'yearly'
                ? `+$${selectedAddon.price.yearly}/yr`
                : `+$${selectedAddon.price.monthly}/mo`
            }`}</span>
        </div>
    )
}