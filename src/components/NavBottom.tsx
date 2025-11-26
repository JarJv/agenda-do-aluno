import '../assets/style.css'
import {House, SignOut} from '@phosphor-icons/react';
import AccessibilityMenu from './AccessibilityMenu';
import { useAuth } from '../context/AuthContext';

export default function NavBottom(){
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };
    
    return(
        <div className='fixed bottom-0 left-0 right-0 bg-(--c1) border-t border-(--c2)'>
            <nav className='flex justify-between items-center px-6 py-8'>
                <SignOut onClick={handleLogout} color='#fff' size={32} weight='bold' className='transform duration-100 active:scale-120 cursor-pointer'/>
                <House color='#fff' size={32} weight='fill' className='transform duration-100 active:scale-120 cursor-pointer'/>
                <AccessibilityMenu/>
            </nav>
        </div>
    )
}
