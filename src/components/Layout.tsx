import { Outlet, useLocation } from "react-router-dom";
import NavTop from './NavTop.tsx'
import NavBottom from './NavBottom.tsx'

export default function Layout() {
  const location = useLocation();
  const showNav = location.pathname !== "/login" && location.pathname !== "/cadastro" && location.pathname !== "/";

  return (
    <div className='min-w-screen min-h-screen bg-(--c1)'>
      {showNav && <NavTop />}
      <Outlet />
      {showNav && <NavBottom />}
    </div>
  );
}