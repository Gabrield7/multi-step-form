import './PlanButton.scss';

interface IPlanButtonProps {
    iconPath: string,
    title: string,
    price: number
}

export const PlanButton: React.FC<IPlanButtonProps> = (props) => {
    return (
        <button type='button' className='button__container'>
            <img src={props.iconPath}/>
            <div>
                <h2>{props.title}</h2>
                <p className='plan-price'>{`$${props.price}/yr`}</p>
                <p className='extra'>2 months free</p>
            </div>
        </button>
    )
}