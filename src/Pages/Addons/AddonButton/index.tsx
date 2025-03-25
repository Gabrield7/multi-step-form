import { useState, useContext } from 'react';
import { availableAddons } from '@contexts/PlanContext/Models';
import { PlanContext } from '@contexts/PlanContext';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';
import './AddonButton.scss';

interface IAddonProps {
    addonName: 'Online service' | 'Larger storage' | 'Customizable profile'
    register: UseFormRegisterReturn
}

export const AddonButton: React.FC<IAddonProps> = ({ addonName, register }) => {
    const [hover, setHover] = useState(false);
    const { plan, setAddons } = useContext(PlanContext);
    
    const selectedAddon = availableAddons[addonName];

    return (
        <fieldset className={clsx('addon__container', { 'checked': plan.addons.includes(addonName) || hover })}>
            <label htmlFor={addonName} className='custom-checkbox'>
                <input 
                    type='checkbox'
                    id={addonName}
                    value={addonName}
                    {...register}
                    checked={plan.addons.includes(addonName)}
                    onChange={() => setAddons(addonName)}
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
        </fieldset>
    )
}