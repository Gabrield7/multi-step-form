import { useContext } from 'react';
import { PlanContext } from '@contexts/PlanContext';
import './ToggleButton.scss';
  
export const ToggleButton = () => {   
    const { plan, setPlan } = useContext(PlanContext);

    return(
        <label className='toggle'>
            <input 
                type='checkbox'
                checked={plan.cycle === 'yearly'}
                onChange={() => setPlan(prev => ({...prev, cycle: plan.cycle === 'monthly' ? 'yearly' : 'monthly'}))}
            />
            <span className='slider'></span>
        </label>
    )
}