import { PageButton } from './PageButton';
import { useLocation } from 'react-router';
import './Footer.scss';

export const Footer = () => {   
    const location = useLocation();
    if(location.pathname === '/confirmation') return;
    
    return (
        <footer className='footer'> 
            <PageButton type='back'/>
            <PageButton type='next'/>
        </footer>
    )
};
