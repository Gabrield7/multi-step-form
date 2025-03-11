import { useContext } from 'react';
import { SignatureContext } from '@contexts/SignatureContext';
import { availablePlans } from '@contexts/Models';
import './PlanButton.scss';

type PlanName = keyof typeof availablePlans;

interface IPlanButtonProps {
    plan: PlanName; 
};

export const PlanButton: React.FC<IPlanButtonProps> = ({ plan }) => {
    const { cycle, setPlan } = useContext(SignatureContext);

    const selectedPlan = availablePlans[plan]
    
    return (
        <button 
            type='button' 
            className='button__container'
            onClick={() => setPlan(selectedPlan)}
        >
            <img src={selectedPlan.iconPath}/>
            <div>
                <h2>{Object.keys(selectedPlan)[0]}</h2>

                <p className='plan-price'>{`${
                    cycle === 'yearly'
                        ? `$${selectedPlan.price.yearly}/yr`
                        : `$${selectedPlan.price.monthly}/mo`
                }`}</p>
                <p style={cycle === 'yearly'? {}:{display: 'none'}} className='extra'>2 months free</p>
            </div>
        </button>
    )
};