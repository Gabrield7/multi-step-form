import { Routes, Route, Navigate } from 'react-router';
import { Info } from './Pages/Info';
import { Plan } from './Pages/Plan';
import { Addons } from './Pages/Addons';
import { Summary } from './Pages/Summary';
import { Confirmation } from './Pages/Confirmation';
import { ValidateRoute } from './Components/ValidateRoute';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='*' element={<Navigate to='/info'/>} />

            {/* <Route path='/info' element={<Info />} />
            <Route path='/plan' element={<Plan />} />
            <Route path='/addons' element={<Addons />} />
            <Route path='/summary' element={<Summary />} />
            <Route path='/confirmation' element={<Confirmation />} /> */}
            {/* <Route path='/info' element={<Info />} /> */}
            <Route
                path='/info'
                element={
                    <ValidateRoute path='/info'>
                        <Info />
                    </ValidateRoute>
                }
            />

            <Route
                path='/plan'
                element={
                    <ValidateRoute path='/plan'>
                        <Plan />
                    </ValidateRoute>
                }
            />

            <Route
                path='/addons'
                element={
                    <ValidateRoute path='/addons'>
                        <Addons />
                    </ValidateRoute>
                }
            />

            <Route
                path='/summary'
                element={
                    <ValidateRoute path='/summary'>
                        <Summary />
                    </ValidateRoute>
                }
            />

            <Route
                path='/confirmation'
                element={
                    <ValidateRoute path='/confirmation'>
                        <Confirmation />
                    </ValidateRoute>
                }
            />
        </Routes>
    );   
}
