import { useContext } from 'react';
import { SignatureContext } from '@contexts/SignatureContext';
import './ToggleButton.scss';
  
export const ToggleButton = () => {   
    const { cycle, setCycle } = useContext(SignatureContext);

    return(
        <label className='toggle'>
            <input 
                type='checkbox'
                checked={cycle === 'yearly'}
                onChange={() => setCycle(cycle === 'monthly' ? 'yearly' : 'monthly')}
            />
            <span className='slider'></span>
        </label>
    )
}