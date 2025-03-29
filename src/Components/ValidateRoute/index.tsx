import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { PageValidationContext } from '@contexts/PageValidationContext';

interface ValidateRouteProps{
    path: '/info' | '/plan' | '/addons' | '/summary' | '/confirmation';
    children: React.ReactNode;
}

export const ValidateRoute: React.FC<ValidateRouteProps> = ({ path, children }) => {
    const { pageStatus } = useContext(PageValidationContext);
    const location = useLocation();
                
    if (!pageStatus[path]) {
        return <Navigate to={location.pathname} replace />;

        //return <Route path={path} element={<Info />} />
    }

    return <>{children}</>;
};