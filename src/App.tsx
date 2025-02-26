import { BrowserRouter } from "react-router";
import { Navbar } from "./Components/Navbar"
import { AppRoutes } from "./routes.tsx"
import './Styles/reset.css'
import './Styles/app.scss'
import { Footer } from "./Components/Footer/index.tsx";

export function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </div>
  )
}
