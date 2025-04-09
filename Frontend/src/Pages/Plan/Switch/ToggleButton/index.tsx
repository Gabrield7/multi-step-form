import './ToggleButton.scss';
import { usePlanStore } from '@stores/PlanStore';
  
export const ToggleButton = () => {   
    const { plan, setPlan } = usePlanStore();

    return(
        <label className='toggle'>
            <input 
                type='checkbox'
                checked={plan.cycle === 'yearly'}
                onChange={() => setPlan('cycle', plan.cycle === 'monthly' ? 'yearly' : 'monthly')}
            />
            <span className='slider'></span>
        </label>
    )
}