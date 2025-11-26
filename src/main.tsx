import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './assets/style.css';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout.tsx';
import Menu from './pages/Menu.tsx'
import Calendario from './pages/Calendario.tsx'
import Notas from './pages/Notas.tsx';
import Configuracoes from './pages/Configuracoes.tsx';
import { Inicio } from './pages/Inicio'; 
import Login from './pages/Login.tsx';
import Cadastro from './pages/Cadastro.tsx';
import RecuperarSenha from './pages/RecuperarSenha.tsx';

import Frequencia from './pages/Frequencia.tsx';
import Alunos from './pages/Alunos.tsx'
import Professores from './pages/Professores.tsx'

import Horario from './pages/Horario.tsx';
import Anotacoes from './pages/Anotações.tsx';
import Perfil from './pages/Perfil.tsx';
import PerfilEditar from './pages/PerfilEditar.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Inicio />
      },
      {
        path: "menu",
        element: <Menu />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "cadastro",
        element: <Cadastro />
      },
      {
        path: "recuperasenha",
        element: <RecuperarSenha />
      },
      {
        path: "calendario",
        element: <Calendario />
      },
      {
        path: "horario",
        element: <Horario />
      },
      {
        path: "professores",
        element: <Professores />
      },
      {
        path: "alunos",
        element: <Alunos />
      },
      {
        path: "frequencia",
        element: <Frequencia />
      },
      {
        path: "notas",
        element: <Notas />
      },
      {
        path: "anotacoes",
        element: <Anotacoes />
      },
      {
        path: "perfil",
        element: <Perfil />
      },
      {
        path: "perfileditar",
        element: <PerfilEditar />
      },
      {
        path: "configuracoes",
        element: <Configuracoes />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)