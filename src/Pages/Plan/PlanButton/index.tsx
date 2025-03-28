import { useContext } from 'react';
import { PlanContext } from '@contexts/PlanContext';
import { availablePlans } from '@contexts/PlanContext/Models';
import { UseFormRegisterReturn } from 'react-hook-form';
import './PlanButton.scss';

interface IPlanButtonProps {
    planName: 'Arcade' | 'Advanced' | 'Pro';
    register?: UseFormRegisterReturn
};

export const PlanButton: React.FC<IPlanButtonProps> = ({ planName, register }) => {
    const { plan } = useContext(PlanContext);
    const selectedPlan = availablePlans[planName];

    return (
        <label htmlFor={planName}>
            <input
                type='radio'
                id={planName}
                value={planName}
                {...register}
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