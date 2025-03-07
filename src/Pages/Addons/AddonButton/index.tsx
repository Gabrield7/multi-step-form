import { useState } from 'react';
import './AddonButton.scss';

interface IAddonProps {
    title: string,
    subtitle: string,
    extra: number
}

export const AddonButton: React.FC<IAddonProps> = (props) => {
    const [check, setCheck] = useState(false);
    const [hover, setHover] = useState(false);

    return (
        <div className={`addon__container ${check || hover? 'checked':''}`}>
            <label className='custom-checkbox'>
                <input 
                    type='checkbox'
                    onChange={() => setCheck(!check)}
                    checked={check}
                />
                <span 
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                />
            </label>
            <div>
                <h2>{props.title}</h2>
                <p>{props.subtitle}</p>
            </div>
            <span className='extra'>{`+$${props.extra}/mo`}</span>
        </div>
    )
}