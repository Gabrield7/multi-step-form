import { BrowserRouter } from "react-router";
import { Navbar } from "./Components/Navbar"
import { AppRoutes } from "./routes.tsx"
import { Footer } from "./Components/Footer/index.tsx";
import './Styles/app.scss'
import './Styles/reset.css'
import { useEffect } from "react";
import { useGlobalStore } from "@stores/mergeStorage.tsx";

export function App() {
    const initializeStores = useGlobalStore((state) => state.initializeStores);

    useEffect(() => {
        initializeStores();
    }, [initializeStores]);
    
    return (
        <BrowserRouter>
            <Navbar />
            <AppRoutes />
            <Footer />
        </BrowserRouter>
    )
}
