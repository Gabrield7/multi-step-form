import { Routes, Route, Navigate } from 'react-router';
import { PlanProvider } from '@contexts/PlanContext';
import { Info } from './Pages/Info';
import { Plan } from './Pages/Plan';
import { Addons } from './Pages/Addons';
import { Summary } from './Pages/Summary';
import { Confirmation } from "./Pages/Confirmation";
import { UserProvider } from '@contexts/UserContext';

export const AppRoutes = () => {
    return (
        <UserProvider>
        <PlanProvider>
            <Routes>
                <Route path='*' element={<Navigate to='/info'/>} />

                <Route path='/info' element={<Info />} />
                <Route path='/plan' element={<Plan />} />
                <Route path='/addons' element={<Addons />} />
                <Route path='/summary' element={<Summary />} />
                <Route path='/confirmation' element={<Confirmation />} />
            </Routes>
        </PlanProvider>
        </UserProvider>
    );   
}
