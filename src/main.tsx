import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './assets/style.css';
import Menu from './pages/Menu.tsx'
import Calendario from './pages/Calendario.tsx'
import NavTop from './components/NavTop.tsx'
import NavBottom from './components/NavBottom.tsx'
import Perfil from './pages/Perfil.tsx'
import Anotacoes from './pages/Anotações.tsx';

let router = createBrowserRouter([
  {
    path: "/",
    element:<Menu/>
  },
  {
    path: "/calendario",
    element: <Calendario />
  },
  {
    path: "/perfil",
    element: <Perfil/>
  },
  {
    path: "/anotacoes",
    element: <Anotacoes/>
  }

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='min-w-screen min-h-screen bg-(--c1)'>
      {(location.pathname !== "/login" && location.pathname !== "/cadastro" && location.pathname !== "/inicio") && <NavTop />}
      <RouterProvider router={router}/>
      {(location.pathname !== "/login" && location.pathname !== "/cadastro" && location.pathname !== "/inicio") && <NavBottom />}
    </div>
  </StrictMode>,
)
