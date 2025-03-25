import { useLocation } from 'react-router';
import './PageButton.scss';

interface IPageButtonProps{
    type: 'back' | 'next'
};

export const PageButton: React.FC<IPageButtonProps> = ({ type }) => {   
    const location = useLocation();
    
    type PagePaths = '/info' | '/plan' | '/addons' | '/summary' | '/confirmation';
    const pathName = location.pathname as PagePaths

    const buttonClass = type === 'back'
        ? pathName === '/info' ? 'hidden' : 'prev'
        : pathName === '/summary' ? 'confirm' : 'next';
    
    const buttonText = type === 'back'
        ? 'Go Back'
        : pathName === '/summary' ? 'Confirm' : 'Next Step';
    
    return (
        <button 
            type='submit'
            className={`page-button ${buttonClass}`}
            {...(buttonClass === 'next' 
                ? { form: `${pathName.split('/')[1]}-form` } 
                : {})}
        >
            {buttonText}
        </button>
    )
};