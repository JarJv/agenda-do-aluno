import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './assets/style.css';
import Menu from './pages/Menu.tsx'

let router = createBrowserRouter([
  {
    path: "/",
    element:<Menu/>,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
