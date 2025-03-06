import { useContext } from 'react';
import { SwitchContext } from '../../SwitchContext';
import './ToggleButton.scss';
  
export const ToggleButton = () => {   
    const { check, setCheck } = useContext(SwitchContext);
    
    return(
        <label className='toggle'>
            <input 
                type='checkbox'
                checked={check}
                onChange={() => setCheck(!check)}
            />
            <span className='slider'></span>
        </label>
    )
}