import './PageButton.scss';

interface IPageButtonProps{
    type: string
}

export const PageButton: React.FC<IPageButtonProps> = (props) => {   
    return (
        <div className='page-button'>{props.type}</div>
    )
};