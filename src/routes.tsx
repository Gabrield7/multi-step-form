import { Routes, Route, Navigate } from 'react-router';
import { Info } from './Pages/Info';
import { Plan } from './Pages/Plan';
import { Addons } from './Pages/Addons';
import { Summary } from './Pages/Summary';
import { Confirmation } from './Pages/Confirmation';
import { ValidateRoute } from './Components/ValidateRoute';
//import { usePageValidationStore } from '@stores/PageStatusStore';

export const AppRoutes = () => {
    //const { pageStatus } = usePageValidationStore();
    
    return (
        <Routes>
            <Route path='*' element={<Navigate to='/info'/>} />

            <Route
                path='/info'
                element={<ValidateRoute path={'/info'} component={<Info />}/>}
            />
            <Route
                path='/plan'
                element={<ValidateRoute path={'/plan'} component={<Plan/>} />}
            />
            <Route
                path='/addons'
                element={<ValidateRoute path={'/addons'} component={<Addons />} />}
            />
            <Route
                path='/summary'
                element={<ValidateRoute path={'/summary'} component={<Summary />} />}
            />
            <Route
                path='/confirmation'
                element={<ValidateRoute path={'/confirmation'} component={<Confirmation />} />}
            />
        </Routes>
    );   
}
