import './Service.scss';

interface IServiceProps {
    type: 'plan' | 'addon' | 'total',
    name: string,
    price: number
}

export const Service: React.FC<IServiceProps> = (props) => {
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
                {props.type === 'plan' && <button>Change</button>}
            </div>
            <p 
                className={`${colorStyle('p')}`}>{`+$${props.price}/mo`}
            </p>
        </div>
    )
}

