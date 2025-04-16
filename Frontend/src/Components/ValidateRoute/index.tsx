//import React, { useContext } from 'react';
import React from 'react';
import { Navigate} from 'react-router';
import { useGlobalStore } from '@stores/mergeStorage';
import { usePageValidationStore } from '@stores/PageStatusStore';
import { safeGetItem } from '@utils/encryptedStorage';
//import { LoadingContext } from '@contexts/LoadingContext';
//import { SpinningLoading } from '@components/spinningLoading';

interface ValidateRouteProps{
    path: '/info' | '/plan' | '/addons' | '/summary' | '/confirmation';
    component: React.JSX.Element
}

const ValidateRoute: React.FC<ValidateRouteProps> = ({ path, component }) => {
    const { pageStatus } = usePageValidationStore();
    const { isInitialized } = useGlobalStore();
    //const { isLoading } = useContext(LoadingContext);

    //if(isLoading) return <SpinningLoading />
    
    if (!isInitialized && safeGetItem()) return null;
    
    const validated = pageStatus[path];

    return validated ? component : <Navigate to={'/info'} />;
};

export { ValidateRoute }