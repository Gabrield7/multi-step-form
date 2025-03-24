import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
//import { useLocation } from 'react-router';
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
        console.log(pageStatus[props.path]);
        
        if(pageStatus[props.path]) navigate(props.path)
    }

    useEffect(() => {
        console.log(pageStatus);
        // if(location.pathname === '/confirmation' && props.path === '/summary'){
        //     setButtonClass('active')
        //}else{
            //const buttonClass = props.path === location.pathname? 'active':'normal';
            if(pageStatus[props.path]){
                if(props.path === location.pathname){
                    setButtonClass('active')
                    console.log('here');
                }else{
                    setButtonClass('normal')
                }
            }else{
                setButtonClass('disabled')
            }
            //setButtonClass(buttonClass)
        //}
    }, [location, props.path, pageStatus]);
    


    return (
        <button 
            className={`navigate-button ${buttonClass}`}
            onClick={navigateToPage}
            // onClick={() => {
            //     console.log(pageStatus);
            //     navigate(props.path)
            // }}
        > 
            {props.label} 
        </button>
    )
};