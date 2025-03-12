import { useContext } from 'react';
import { SignatureContext } from '@contexts/SignatureContext';
import { availablePlans } from '@contexts/Models';
import './PlanButton.scss';

interface IPlanButtonProps {
    plan: 'Arcade' | 'Advanced' | 'Pro';
};

export const PlanButton: React.FC<IPlanButtonProps> = ({ plan }) => {
    //const context = useContext(SignatureContext);
    const { cycle, setPlan } = useContext(SignatureContext);
    const selectedPlan = availablePlans[plan];

    // useEffect(() => {
    //     console.log(context);
    // }, [context]);
    
    return (
        <button 
            type='button'
            className='button__container'
            onClick={() => setPlan(plan)}
        >
            <img src={selectedPlan.iconPath}/>
            <div>
                <h2>{plan}</h2>
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