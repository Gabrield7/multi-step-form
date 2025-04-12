import { BrowserRouter } from "react-router";
import { Navbar } from "./Components/Navbar"
import { AppRoutes } from "./routes.tsx"
import { Footer } from "./Components/Footer/index.tsx";
import { useEffect } from "react";
import { useGlobalStore } from "@stores/mergeStorage.tsx";
import './Styles/app.scss';
import './Styles/reset.css';

export function App() {   
    const initializeStores = useGlobalStore((state) => state.initializeStores);

    useEffect(() => {
        initializeStores();
    }, [initializeStores]);
    
    return (
        <BrowserRouter>
            <Navbar />
            <section className='body__container'>
                <AppRoutes />
                <Footer />
            </section>
        </BrowserRouter>
    )
}
