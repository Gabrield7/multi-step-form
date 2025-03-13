import { useContext } from 'react';
import { SignatureContext } from '@contexts/SignatureContext';
import { availablePlans } from '@contexts/Models';
import './PlanButton.scss';

interface IPlanButtonProps {
    planName: 'Arcade' | 'Advanced' | 'Pro';
};

export const PlanButton: React.FC<IPlanButtonProps> = ({ planName }) => {
    const { plan, cycle, setPlan } = useContext(SignatureContext);
    const selectedPlan = availablePlans[planName];
    
    return (
        <button 
            type='button'
            className={`button__container ${plan === planName? 'selected-button':''}`}
            onClick={() => setPlan(planName)}
        >
            <img src={selectedPlan.iconPath}/>
            <div>
                <h2>{planName}</h2>
                <p className='plan-price'>{`${
                    cycle === 'yearly'
                        ? `$${selectedPlan.price.yearly}/yr`
                        : `$${selectedPlan.price.monthly}/mo`
                }`}</p>
                {cycle === 'yearly' && <p className="extra">2 months free</p>}
            </div>
        </button>
    )
};