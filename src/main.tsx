import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './assets/style.css';
import Menu from './pages/Menu.tsx'
import Calendario from './pages/Calendario.tsx'
import NavTop from './components/NavTop.tsx'

let router = createBrowserRouter([
  {
    path: "/",
    element:<Menu/>
  },
  {
    path: "/calendario",
    element: <Calendario />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='max-w-[414px] min-h-screen bg-(--c1)'>
      <NavTop />
      <RouterProvider router={router}/>
    </div>
  </StrictMode>,
)
