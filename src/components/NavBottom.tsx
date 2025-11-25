import '../assets/style.css'
import {House, SignOut} from '@phosphor-icons/react';
import AccessibilityMenu from './AccessibilityMenu';

export default function NavBottom(){
    return(
        <div className='fixed bottom-0 left-0 right-0'>
            <nav className='flex justify-between items-center px-6 py-8'>
                <SignOut color='#fff' size={32} weight='bold' className='transform duration-100 active:scale-120 cursor-pointer'/>
                <House color='#fff' size={32} weight='fill' className='transform duration-100 active:scale-120 cursor-pointer'/>
                <AccessibilityMenu/>
            </nav>
        </div>
    )
}
