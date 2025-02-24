import { BrowserRouter } from "react-router";
import { Navbar } from "./Components/Navbar"
import { AppRoutes } from "./routes.tsx"
import './Styles/reset.css'

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}
