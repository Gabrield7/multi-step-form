import { useLocation, useNavigate } from 'react-router';
import { usePageValidationStore } from '@stores/PageStatusStore';
import './PageButton.scss';

interface IPageButtonProps{
    type: 'back' | 'next'
};

const confirmRegister = async () => {
    const storage = localStorage.getItem('signature-storage-global');
    const data = storage ? JSON.parse(storage) : null;

    const user = data?.user;
    const plan = data?.plan;

    if (!user || !plan) return;

    try {
        const response = await fetch('api/register', {
        //const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user, plan})
        });
        
        const body = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: body.message || 'Unnexpected server error',
                status: body.status || response.status,
            };
        }

        return body;
    } catch (error) {
        return { 
            success: false,
            message: 'Failed to connect to server. Please try again later',
            error
        }
    }
}

export const PageButton: React.FC<IPageButtonProps> = ({ type }) => {   
    const { pageStatus, validatePage } = usePageValidationStore();
    
    const location = useLocation();
    const navigate = useNavigate();
    
    type PagePaths = '/info' | '/plan' | '/addons' | '/summary' | '/confirmation';
    const pathName = location.pathname as PagePaths

    const handleClick = async (): Promise<void> => {
        const response = await confirmRegister();

        if(!pageStatus['/confirmation']) validatePage('/confirmation', true);
        navigate('/confirmation', {state: response});        
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
