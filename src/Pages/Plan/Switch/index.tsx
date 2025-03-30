import { ToggleButton } from './ToggleButton'
import { usePlanStore } from '@stores/PlanStore';
import clsx from 'clsx';
import './Switch.scss'

export const Switch = () => {
    const { plan } = usePlanStore();
    
    return (
        <div className='switch__container'>
            <p className={clsx({ 'checked': plan.cycle === 'monthly' })}>Monthly</p>
            <ToggleButton />
            <p className={clsx({ 'checked': plan.cycle === 'yearly' })}>Yearly</p>
        </div>
    )
}