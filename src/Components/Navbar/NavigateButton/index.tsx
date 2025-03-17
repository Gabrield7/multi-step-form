import React, { useEffect, useState } from 'react';
import './NavigateButton.scss';
import { useLocation, useNavigate} from 'react-router';

interface INavigateButtonProps{
    label: number,
    path: string
};

export const NavigateButton: React.FC<INavigateButtonProps> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [buttonClass, setButtonClass] = useState<string>('navigate-button normal');

    useEffect(() => {
        if(location.pathname === '/confirmation' && props.path === '/summary'){
            setButtonClass('navigate-button active')
        }else{
            const buttonClass = props.path === location.pathname? 'active':'normal'; 
            setButtonClass(`navigate-button ${buttonClass}`)
        }
        
    }, [location, props.path]);
    
    return (
        <button 
            className={buttonClass}
            onClick={() => navigate(props.path)}
        > 
            {props.label} 
        </button>
    )
};