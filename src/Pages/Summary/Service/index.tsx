import { useContext } from 'react';
import { SignatureContext } from '@contexts/SignatureContext';
import { useNavigate } from 'react-router';
import './Service.scss';

interface IServiceProps {
    type: 'plan' | 'addon' | 'total',
    name: string,
    price: number
}

export const Service: React.FC<IServiceProps> = (props) => {
    const { cycle } = useContext(SignatureContext);
    const navigate = useNavigate();
    
    const colorStyle = (element: string) => {
        const colorMap: Record<string, string> = {
            'plan:h3': 'marine-blue',
            'plan:p': 'marine-blue',
            'addon:p': 'marine-blue',
            'addon:h3': 'cool-gray',
            'total:h3': 'cool-gray',
            'total:p': 'purplish-blue'
        };
    
        return colorMap[`${props.type}:${element}`] || '';
    };

    return (
        <div className='service__container'>
            <div>
                <h3 className={`${colorStyle('h3')}`}>{props.name}</h3>
                {props.type === 'plan' && <button onClick={() => navigate('/plan')}>Change</button>}
            </div>
            <p 
                className={`${colorStyle('p')}`}>{`+$${props.price}/${cycle === 'monthly'? 'mo':'yr'}`}
            </p>
        </div>
    )
}

