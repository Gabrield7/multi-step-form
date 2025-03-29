import { BrowserRouter } from "react-router";
import { AppProvider } from '@contexts/AppProvider';
import { Navbar } from "./Components/Navbar"
import { AppRoutes } from "./routes.tsx"
import { Footer } from "./Components/Footer/index.tsx";
import './Styles/app.scss'
import './Styles/reset.css'

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Navbar />
        <AppRoutes />
        <Footer />
      </AppProvider>
    </BrowserRouter>
  )
}
