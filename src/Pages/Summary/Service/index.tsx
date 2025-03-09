import './Service.scss';

interface IServiceProps {
    type: 'plan' | 'addon' | 'total',
    name: string,
    price: number
}

export const Service: React.FC<IServiceProps> = (props) => {

    return (
        <div className='service__container'>
            <div>
                <h3>{props.name}</h3>
                {props.type === 'plan' && <button>Change</button>}
            </div>
            <p>{`+$${props.price}/mo`}</p>
        </div>
    )
}