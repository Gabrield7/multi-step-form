import { usePageValidationStore } from '@stores/PageStatusStore';
import React from 'react';
import { Navigate } from 'react-router';
//import { useNavigate } from 'react-router';
//import { usePageValidationStore } from '@stores/PageStatusStore';

interface ValidateRouteProps{
    path: '/info' | '/plan' | '/addons' | '/summary' | '/confirmation';
    //children: React.ReactNode
    component: React.JSX.Element
}

const ValidateRoute: React.FC<ValidateRouteProps> = ({ path, component }) => {
    //return validated ? component : <Navigate to={'/info'} />;
    const { pageStatus } = usePageValidationStore();

    const validated = pageStatus[path];
    console.log(path, validated);
    
    return validated ? component : <Navigate to={'/info'} />;
};

// export const ValidateRoute: React.FC<ValidateRouteProps> = ({ children }) => {
//     //const { pageStatus } = usePageValidationStore()
//     //const navigate = useNavigate();

//     // useEffect(() => {    
//     //     //console.log(path, pageStatus[path]);
//     //     console.log('alterado');
        

//     //     //if (!pageStatus[path]) navigate(-1);
//     // });
    
//     return <>{children}</>;
// };

export { ValidateRoute }