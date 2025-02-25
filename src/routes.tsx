import { Routes, Route, Navigate } from "react-router";
import { Info } from "./Pages/Info";
import { Plan } from "./Pages/Plan";
import { Addons } from "./Pages/Addons";
import { Summary } from "./Pages/Summary";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='*' element={<Navigate to='/info'/>} />

            <Route path='/info' element={<Info />} />
            <Route path='/plan' element={<Plan />} />
            <Route path='/addons' element={<Addons />} />
            <Route path='/summary' element={<Summary />} />
        </Routes>
    );   
}
