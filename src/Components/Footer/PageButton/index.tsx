import { useLocation } from 'react-router';
import { ButtonHTMLAttributes } from 'react';
import './PageButton.scss';

interface IPageButtonProps{
    type: 'back' | 'next'
}

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

    const formID = (path: PagePaths): ButtonHTMLAttributes<HTMLButtonElement> => {       
        const id = `${path.split('/')[1]}-form`;

        return {form: id, type: 'submit'}
    }
    
    return (
        <button 
            className={`page-button ${buttonClass}`}
            {...formID(pathName)}
        >
            {buttonText}
        </button>
    )
};