import '../assets/style.css'
import {House, SignOut} from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import AccessibilityMenu from './AccessibilityMenu';
import { useAuth } from '../context/AuthContext';

export default function NavBottom(){
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleHome = () => {
        navigate('/menu');
    };
    
    return(
        <div className='fixed bottom-0 left-0 right-0 bg-(--c1) border-t border-(--c2)'>
            <nav className='flex justify-between items-center px-6 py-5'>
                <SignOut onClick={handleLogout} color='#fff' size={32} weight='bold' className='transform duration-100 active:scale-120 cursor-pointer'/>
                <House onClick={handleHome} color='#fff' size={32} weight='fill' className='transform duration-100 active:scale-120 cursor-pointer'/>
                <AccessibilityMenu/>
            </nav>
        </div>
    )
}
