//import { useLocation, useNavigate } from 'react-router';
import { useLocation } from 'react-router';
import './PageButton.scss';

interface IPageButtonProps{
    type: 'back' | 'next'
}

export const PageButton: React.FC<IPageButtonProps> = (props) => {   
    const location = useLocation();
    //const navigateToPage = useNavigate();

    //const pages: string[] = ['/info', '/plan', '/addons', '/summary', '/confirmation'];
    //const currentPage = pages.indexOf(location.pathname);

    // const navigation = () => {
    //     if(props.type === 'back'){
    //         if (currentPage > 0) navigateToPage(pages[currentPage - 1]);
    //     } else {
    //         if (currentPage < pages.length - 1) navigateToPage(pages[currentPage + 1]);
    //     }
    // };

    const buttonClass = props.type === 'back'
        ? location.pathname === '/info' ? 'hidden' : 'prev'
        : location.pathname === '/summary' ? 'confirm' : 'next';
    
    const buttonText = props.type === 'back'
        ? 'Go Back'
        : location.pathname === '/summary' ? 'Confirm' : 'Next Step';

    return (
        <button 
            className={`page-button ${buttonClass}`}
            {...(location.pathname === '/info'
                ? {form: 'user-form', type: 'submit'}
                : {})} //onClick: () => navigation()
        >
            {buttonText}
        </button>
    )
};