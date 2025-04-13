import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { usePageValidationStore } from '@stores/PageStatusStore';
import './NavigateButton.scss';

interface INavigateButton{
    label: number
    name: string
    path: '/info' | '/plan' | '/addons' | '/summary' | '/confirmation'
};

export const NavigateButton: React.FC<INavigateButton> = ({ label, name, path }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [buttonClass, setButtonClass] = useState<'normal' | 'active' | 'disabled'>('normal');

    const { pageStatus } = usePageValidationStore();
    
    const navigateToPage = () => {
        const isPageEnabled = pageStatus[path] ?? false;
        
        if(isPageEnabled) navigate(path)
    }

    useEffect(() => {
        const isFinalPage = location.pathname === '/confirmation' && path === '/summary';
        const isCurrentPath = path === location.pathname;

        if (isFinalPage) {
            setButtonClass('active');
        } else if (pageStatus[path]) {
            setButtonClass(isCurrentPath ? 'active' : 'normal');
        } else {
            setButtonClass('disabled');
        }
    }, [location, path, pageStatus]);
    

    return (
        <button 
            className={`navigate-button__container ${buttonClass}`}
            onClick={navigateToPage}
        >
            <span className={`navigate-button`}>{label}</span>
            <div className='button-description'>
                <h4>{`STEP ${label}`}</h4>
                <p>{name}</p>
            </div> 
        </button>
    )
};