import { usePlanStore } from '@stores/PlanStore';
import { availablePlans } from '@stores/PlanStore/availableServices';
import './PlanButton.scss';

interface IPlanButtonProps {
    planName: 'Arcade' | 'Advanced' | 'Pro';
};

export const PlanButton: React.FC<IPlanButtonProps> = ({ planName }) => {
    const { plan, setPlan } = usePlanStore();
    const selectedPlan = availablePlans[planName];

    return (
        <label htmlFor={planName}>
            <input
                type='radio'
                id={planName}
                value={planName}
                checked={plan.name === planName}
                onChange={() => setPlan('name', planName)}
                hidden
            />
            <div className='button__container'>
                <img src={selectedPlan.img.path} alt={selectedPlan.img.alt} aria-hidden='true'/>
                <div>
                    <h2>{planName}</h2>
                    <p className='plan-price'>
                        {`${
                            plan.cycle === 'yearly'
                                ? `$${selectedPlan.price.yearly}/yr`
                                : `$${selectedPlan.price.monthly}/mo`
                        }`}
                    </p>
                    {plan.cycle === 'yearly' && <p className="extra">2 months free</p>}
                </div>
            </div>
        </label>
    )
};