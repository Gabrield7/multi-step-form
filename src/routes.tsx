import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Info } from "./pages/Info/Info";
import { Plan } from "./pages/plan/Plan";
import { Addons } from "./pages/addons/Addons";
import { Summary } from "./pages/summary/Summary";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<Navigate to='/info'/>} />

                <Route path='/info' element={<Info />} />
                <Route path='/plan' element={<Plan />} />
                <Route path='/addons' element={<Addons />} />
                <Route path='/summary' element={<Summary />} />
            </Routes>
        </BrowserRouter>
    );   
}
