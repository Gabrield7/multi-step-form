import { useState, useContext, useEffect } from 'react';
import { availableAddons } from '@contexts/Models';
import { SignatureContext } from '@contexts/SignatureContext';
import clsx from 'clsx';
import './AddonButton.scss';

interface IAddonProps {
    addonName: 'Online service' | 'Larger storage' | 'Customizable profile'
}

export const AddonButton: React.FC<IAddonProps> = ({ addonName }) => {
    const [hover, setHover] = useState(false);

    const { plan, price, cycle, addons, setAddons } = useContext(SignatureContext);
    //const { cycle, addons, setAddons } = useContext(SignatureContext);
    const selectedAddon = availableAddons[addonName];

    useEffect(() => {
        console.log(plan, cycle, addons, price);
    }, [plan, cycle, addons, price]);

    return (
        <div className={clsx('addon__container', { 'checked': addons.includes(addonName) || hover })}>
            <label className='custom-checkbox'>
                <input 
                    type='checkbox'
                    onChange={() => setAddons(addonName)}
                    checked={addons.includes(addonName)}
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
                cycle === 'yearly'
                ? `+$${selectedAddon.price.yearly}/yr`
                : `+$${selectedAddon.price.monthly}/mo`
            }`}</span>
        </div>
    )
}