import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './assets/style.css';
import Menu from './pages/Menu.tsx'
import Calendario from './pages/Calendario.tsx'
import Notas from './pages/Notas.tsx'
import Configuracoes from './pages/Configuracoes.tsx'
import NavTop from './components/NavTop.tsx'
import NavBottom from './components/NavBottom.tsx'
import Alunos from './pages/Alunos.tsx'
import Professores from './pages/Professores.tsx'


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
    path: "/notas",
    element: <Notas />
  },
  {
    path: "/configuracoes",
    element: <Configuracoes />
  },
  {
    path:'/alunos',
    element:<Alunos/>
  },
  {
    path:'/professores',
    element:<Professores/>
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
