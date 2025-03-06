//import { useState } from 'react'
import { ToggleButton } from './ToggleButton'
import clsx from 'clsx';
import './Switch.scss'

interface ISwitchProps {
    check: boolean,
    setCheck: React.Dispatch<React.SetStateAction<boolean>>
}

export const Switch: React.FC<ISwitchProps> = (props) => {
    //const [check, setCheck] = useState(false);
    //console.log(check);
    
    return (
        <div className='switch__container'>
            <p className={clsx({ 'checked': !props.check })}>Monthly</p>
            <ToggleButton check={props.check} setCheck={props.setCheck}/>
            <p className={clsx({ 'checked': props.check })}>Yearly</p>
        </div>
    )
}