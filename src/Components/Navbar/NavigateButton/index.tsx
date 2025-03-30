import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import './NavigateButton.scss';
import { usePageValidationStore } from '@stores/PageStatusStore';

interface INavigateButtonProps{
    label: number,
    path: '/info' | '/plan' | '/addons' | '/summary' | '/confirmation'
};

export const NavigateButton: React.FC<INavigateButtonProps> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [buttonClass, setButtonClass] = useState<'normal' | 'active' | 'disabled'>('normal');

    const { pageStatus } = usePageValidationStore();
    
    const navigateToPage = () => {
        const isPageEnabled = pageStatus[props.path] ?? false;
        
        if(isPageEnabled) navigate(props.path)
    }

    useEffect(() => {
        const isFinalPage = location.pathname === '/confirmation' && props.path === '/summary';
        const isCurrentPath = props.path === location.pathname;

        if (isFinalPage) {
            setButtonClass('active');
        } else if (pageStatus[props.path]) {
            setButtonClass(isCurrentPath ? 'active' : 'normal');
        } else {
            setButtonClass('disabled');
        }
    }, [location, props.path, pageStatus]);
    
    return (
        <button 
            className={`navigate-button ${buttonClass}`}
            onClick={navigateToPage}
        > 
            {props.label} 
        </button>
    )
};