import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Info } from "./Pages/Info/Info";
import { Plan } from "./Pages/Plan/Plan";
import { Addons } from "./Pages/Addons/Addons";
import { Summary } from "./Pages/Summary/Summary";

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
