import { useContext } from 'react';
import { SwitchContext } from '../SwitchContext';
import './PlanButton.scss';

interface IPlanButtonProps {
    iconPath: string,
    title: string,
    price: number,
    // yearly: boolean
}

export const PlanButton: React.FC<IPlanButtonProps> = (props) => {
    const { check } = useContext(SwitchContext);
    
    return (
        <button type='button' className='button__container'>
            <img src={props.iconPath}/>
            <div>
                <h2>{props.title}</h2>
                <p className='plan-price'>{`${check? `$${props.price*10}/yr`:`$${props.price}/mo`}`}</p>
                <p style={check? {}:{display: 'none'}} className='extra'>2 months free</p>
            </div>
        </button>
    )
}