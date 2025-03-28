import { useLocation, useNavigate } from 'react-router';
import { PageValidationContext } from '@contexts/PageValidationContext';
import { UserContext } from '@contexts/UserContext';
import { PlanContext } from '@contexts/PlanContext';
import { useContext } from 'react';
import './PageButton.scss';

interface IPageButtonProps{
    type: 'back' | 'next'
};

export const PageButton: React.FC<IPageButtonProps> = ({ type }) => {   
    const { user } = useContext(UserContext);
    const { plan } = useContext(PlanContext);
    const { pageStatus, validatePage } = useContext(PageValidationContext);
    
    const location = useLocation();
    const navigate = useNavigate();
    
    type PagePaths = '/info' | '/plan' | '/addons' | '/summary' | '/confirmation';
    const pathName = location.pathname as PagePaths

    const sendSubscription = async (): Promise<void> => {
        localStorage.setItem('signature', JSON.stringify({user, plan, pageStatus}));
    }

    const handleClick = async (): Promise<void> => {
        if(location.pathname !== '/summary') return

        await sendSubscription();

        validatePage('/confirmation', true);
        navigate('/confirmation');
    }

    interface ButtonConfig {
        className: string;
        text: string;
        onClick?: () => void;
        type?: 'submit' | 'button';
        form?: string;
    }

    const getButtonConfig = (): ButtonConfig | undefined => {
        if (type === 'back') {
            if (pathName === '/info') return;
            return { className: 'page-button back', text: 'Go Back', onClick: () => navigate(-1) };
        }
        
        if (pathName === '/summary') {
            return { className: 'page-button confirm', text: 'Confirm', onClick: handleClick };
        }

        return { 
            className: 'page-button next', 
            text: 'Next Step', 
            type: 'submit', 
            form: `${pathName.split('/')[1]}-form`
        };
    };

    const buttonProps = getButtonConfig();
    if(!buttonProps) return null;

    return <button {...buttonProps}> {buttonProps?.text} </button>

};