import { useContext } from 'react';
import { SignatureContext } from '@contexts/Signature/SignatureContext';
import { availablePlans } from '@contexts/Signature/Models';
import clsx from 'clsx';
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
            className={clsx('button__container', { 'selected-button': plan === planName })}
            onClick={() => setPlan(planName)}
        >
            <img src={selectedPlan.img.path} alt={selectedPlan.img.alt}/>
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