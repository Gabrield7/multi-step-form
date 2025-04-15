import { useLocation, useNavigate } from 'react-router';
import { usePageValidationStore } from '@stores/PageStatusStore';
import { useGlobalStore } from '@stores/mergeStorage';
import { safeGetItem } from '@utils/encryptedStorage';
import { useContext } from 'react';
import { LoadingContext } from '@contexts/LoadingContext';
import { confirmRegister } from './confirmRegister';
import './PageButton.scss';

interface IPageButtonProps{
    type: 'back' | 'next'
};

export const PageButton: React.FC<IPageButtonProps> = ({ type }) => {   
    const { pageStatus, validatePage } = usePageValidationStore();
    const { setSyncEnabled } = useGlobalStore();
    const { setIsLoading } = useContext(LoadingContext);
    
    const location = useLocation();
    const navigate = useNavigate();
    
    type PagePaths = '/info' | '/plan' | '/addons' | '/summary' | '/confirmation';
    const pathName = location.pathname as PagePaths

    const subcription = async (): Promise<void> => {
        setIsLoading(true);
        const response = await confirmRegister();
        setIsLoading(false);

        if(response.success){
            setSyncEnabled(false); //prevents the store to set the values back to the localStorage

            const storage = safeGetItem();
            
            if(storage) localStorage.removeItem('signature-storage-global');
        }

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
            return { className: 'page-button confirm', text: 'Confirm', onClick: subcription };
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
