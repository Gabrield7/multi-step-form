import { useLocation, useNavigate } from 'react-router';
import './PageButton.scss';

interface IPageButtonProps{
    type: string
}

export const PageButton: React.FC<IPageButtonProps> = (props) => {   
    const location = useLocation();
    const navigateToPage = useNavigate();

    const navigation = () => {
        const pages: string[] = ['/info', '/plan', '/addons', '/summary']
        const currentPage = pages.indexOf(location.pathname);

        if(props.type === 'Go Back'){
            if (currentPage > 0) navigateToPage(pages[currentPage - 1]);
        } else {
            if (currentPage < pages.length - 1) navigateToPage(pages[currentPage + 1]);
        }
    };

    const hideButton = () => {
        let style: React.CSSProperties = { display: 'flex' };

        if (location.pathname === '/info') {
            style = props.type === 'Go Back' 
                ? { display: 'none' } 
                : { ...style, marginLeft: 'auto' };
        } else if (location.pathname === '/summary') {
            style = props.type === 'Next Step' 
                ? { display: 'none' } 
                : { ...style, marginRight: 'auto' };
        }

        return style;
    };

    const buttonStyle = (): string => {
        const buttonClass = props.type === 'Go Back'? 'prev':'next' 

        return `page-button ${buttonClass}`
    };

    return (
        <button 
            className={buttonStyle()}
            onClick={() => navigation()}
            style={hideButton()}
        >
            {props.type}
        </button>
    )
};