import { useContext } from 'react';
import { PlanContext } from '@contexts/PlanContext';
import { availablePlans } from '@contexts/PlanContext/Models';
import clsx from 'clsx';
import './PlanButton.scss';

interface IPlanButtonProps {
    planName: 'Arcade' | 'Advanced' | 'Pro';
};

export const PlanButton: React.FC<IPlanButtonProps> = ({ planName }) => {
    const { plan, setPlan } = useContext(PlanContext);
    const selectedPlan = availablePlans[planName];
    
    return (
        <button 
            type='button'
            className={clsx('button__container', { 'selected-button': plan.name === planName })}
            onClick={() => setPlan(prev => ({...prev, name: planName}))}
        >
            <img src={selectedPlan.img.path} alt={selectedPlan.img.alt}/>
            <div>
                <h2>{planName}</h2>
                <p className='plan-price'>{`${
                    plan.cycle === 'yearly'
                        ? `$${selectedPlan.price.yearly}/yr`
                        : `$${selectedPlan.price.monthly}/mo`
                }`}</p>
                {plan.cycle === 'yearly' && <p className="extra">2 months free</p>}
            </div>
        </button>
    )
};