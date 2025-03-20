import { ToggleButton } from './ToggleButton'
import { PlanContext } from '@contexts/PlanContext';
import { useContext } from 'react';
import clsx from 'clsx';
import './Switch.scss'

export const Switch = () => {
    const { plan } = useContext(PlanContext);
    
    return (
        <div className='switch__container'>
            <p className={clsx({ 'checked': plan.cycle === 'monthly' })}>Monthly</p>
            <ToggleButton />
            <p className={clsx({ 'checked': plan.cycle === 'yearly' })}>Yearly</p>
        </div>
    )
}