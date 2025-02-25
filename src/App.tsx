import { BrowserRouter } from "react-router";
import { Navbar } from "./Components/Navbar"
import { AppRoutes } from "./routes.tsx"
import './Styles/reset.css'
import './Styles/app.scss'

export function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}
