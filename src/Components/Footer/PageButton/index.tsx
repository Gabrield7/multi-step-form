import { useLocation, useNavigate } from 'react-router';
import './PageButton.scss';
import { useContext } from 'react';
import { UserContext } from '@contexts/User/UserContext';

interface IPageButtonProps{
    type: 'left' | 'right'
}

export const PageButton: React.FC<IPageButtonProps> = (props) => {   
    const location = useLocation();
    const navigateToPage = useNavigate();

    const pages: string[] = ['/info', '/plan', '/addons', '/summary', '/confirmation'];
    const currentPage = pages.indexOf(location.pathname);

    const navigation = () => {
        if(props.type === 'left'){
            if (currentPage > 0) navigateToPage(pages[currentPage - 1]);
        } else {
            if (currentPage < pages.length - 1) navigateToPage(pages[currentPage + 1]);
        }
    };

    const buttonClass = props.type === 'left'
        ? location.pathname === '/info' ? 'hidden' : 'prev'
        : location.pathname === '/summary' ? 'confirm' : 'next';
    
    const buttonText = props.type === 'left'
        ? 'Go Back'
        : location.pathname === '/summary' ? 'Confirm' : 'Next Step';

    const { name, email, phone } = useContext(UserContext);
    return (
        <button 
            className={`page-button ${buttonClass}`}
            onClick={() => {
                navigation()
                console.log(name)
                console.log(email)
                console.log(phone)
            }}
        >
            {buttonText}
        </button>
    )
};