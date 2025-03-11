import { useContext } from 'react';
import { SignatureContext } from '../../../Contexts/SignatureContext';
import { availablePlans } from '../../../Contexts/Models';
import './PlanButton.scss';

type PlanName = keyof typeof availablePlans;
type Plan = typeof availablePlans[PlanName];

interface IPlanButtonProps {
    plan: Plan; 
};

export const PlanButton: React.FC<IPlanButtonProps> = ({ plan }) => {
    const { cycle, setPlan } = useContext(SignatureContext);
    
    return (
        <button 
            type='button' 
            className='button__container'
            onClick={() => setPlan(plan)}
        >
            <img src={plan.iconPath}/>
            <div>
                <h2>{Object.keys(plan)[0]}</h2>

                <p className='plan-price'>{`${cycle === 'yearly'? `$${plan.price.yearly}/yr`:`$${plan.price.monthly}/mo`}`}</p>
                <p style={cycle === 'yearly'? {}:{display: 'none'}} className='extra'>2 months free</p>
            </div>
        </button>
    )
}