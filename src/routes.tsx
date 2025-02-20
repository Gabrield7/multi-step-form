import { BrowserRouter, Routes, Route, Navigate } from "react-router";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<Navigate to='/info'/>} />

                <Route path='/info' element={<p>Your Info</p>} />
                <Route path='/plan' element={<p>Select Plan</p>} />
                <Route path='/addons' element={<p>Add-ons</p>} />
                <Route path='/summary' element={<p>Summary</p>} />
            </Routes>
        </BrowserRouter>
    );   
}
