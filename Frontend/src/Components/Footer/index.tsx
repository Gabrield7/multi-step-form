import { PageButton } from './PageButton';
import { useLocation } from 'react-router';
import './Footer.scss';
import { useContext } from 'react';
import { LoadingContext } from '@contexts/LoadingContext';

export const Footer = () => {   
    const location = useLocation();
    if(location.pathname === '/confirmation') return;

    const { isLoading } = useContext(LoadingContext);

    if (isLoading) return <footer className='footer'></footer>

    return (
        <footer className='footer'> 
            {!isLoading && (
            <>
                <PageButton type='back' />
                <PageButton type='next' />
            </>
        )}
        </footer>
    )
};
