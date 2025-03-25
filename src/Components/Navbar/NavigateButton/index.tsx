import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PageValidationContext } from '@contexts/PageValidationContext';
import './NavigateButton.scss';

interface INavigateButtonProps{
    label: number,
    path: '/info' | '/plan' | '/addons' | '/summary' | '/confirmation'
};

export const NavigateButton: React.FC<INavigateButtonProps> = (props) => {
    const location = useLocation();
    const [buttonClass, setButtonClass] = useState<'normal' | 'active' | 'disabled'>('normal');
    const { pageStatus } = useContext(PageValidationContext);
    const navigate = useNavigate();
    
    const navigateToPage = () => {
        const isPageEnabled = pageStatus[props.path] ?? false;
        
        if(isPageEnabled) navigate(props.path)
    }

    useEffect(() => {
        if(location.pathname === '/confirmation' && props.path === '/summary'){
            setButtonClass('active')
        }else{
            if(pageStatus[props.path]){
                const buttonClass = props.path === location.pathname? 'active':'normal';
                setButtonClass(buttonClass)
            }else{
                setButtonClass('disabled')
            }
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