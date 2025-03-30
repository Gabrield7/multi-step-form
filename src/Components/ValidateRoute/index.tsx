import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { PageValidationContext } from '@contexts/PageValidationContext';

interface ValidateRouteProps{
    path: '/info' | '/plan' | '/addons' | '/summary' | '/confirmation';
    children: React.ReactNode;
}

export const ValidateRoute: React.FC<ValidateRouteProps> = ({ path, children }) => {
    const { pageStatus } = useContext(PageValidationContext);
    const navigate = useNavigate();

    useEffect(() => {    
        if (!pageStatus[path]) navigate(-1);
    }, [pageStatus, path, navigate]);
    
    return <>{children}</>;
};