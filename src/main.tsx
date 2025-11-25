import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './assets/style.css';
import Menu from './pages/Menu.tsx'
import Calendario from './pages/Calendario.tsx'
import Notas from './pages/Notas.tsx';
import Configuracoes from './pages/Configuracoes.tsx';
import { Inicio } from './pages/Inicio'; 
import Login from './pages/Login.tsx';
import Cadastro from './pages/Cadastro.tsx';
import RecuperarSenha from './pages/RecuperarSenha.tsx';

import Frequencia from './pages/Frequencia.tsx';
import NavTop from './components/NavTop.tsx'
import NavBottom from './components/NavBottom.tsx'
import Alunos from './pages/Alunos.tsx'
import Professores from './pages/Professores.tsx'

import Horario from './pages/Horario.tsx';
import Anotacoes from './pages/Anotações.tsx';
import Perfil from './pages/Perfil.tsx';

let router = createBrowserRouter([
  {
    path: "/",
    element:<Inicio/>
  },
  {
    path: "/calendario",
    element: <Calendario />
  },
  {
    path: "/frequencia",
    element: <Frequencia/>
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
  },
  {
    path: "/menu",
     element: <Menu />
  },
  {
      path: "/login",
    element: <Login/>
  },
  {
    path: "/cadastro",
    element: <Cadastro/>
  },
  {
    path: "/recuperar-senha",
    element: <RecuperarSenha/>
  },
  {
    path: "/menu",
    element: <Menu/>
  },
  {
    path: "/horario",
    element: <Horario/>
  },
    {
    path: "/professores",
    element: <Professores/>
  },
    {
    path: "/alunos",
    element: <Alunos/>
  },
  {
    path: "/anotacoes",
    element: <Anotacoes/>
  },
  {
    path: "/perfil",
    element: <Perfil/>
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='min-w-screen min-h-screen bg-(--c1)'>
      {(location.pathname !== "/login" && location.pathname !== "/cadastro" && location.pathname !== "/") && <NavTop />}
      <RouterProvider router={router}/>
      {(location.pathname !== "/login" && location.pathname !== "/cadastro" && location.pathname !== "/") && <NavBottom />}
    </div>
  </StrictMode>,
)
