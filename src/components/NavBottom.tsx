import '../assets/style.css'
import {House, SignOut} from '@phosphor-icons/react';
import AccessibilityMenu from './AccessibilityMenu';

export default function NavBottom(){
    return(
        <div className='fixed bottom-0 left-0 right-0 bg-(--c1)'>
            <nav className='flex justify-between items-center px-6 py-8'>
                <a href="/"><SignOut href="/menu" color='#fff' size={32} weight='bold' className='transform duration-100 active:scale-120 cursor-pointer'/></a>
                <a href="/menu"><House href="/menu" color='#fff' size={32} weight='fill' className='transform duration-100 active:scale-120 cursor-pointer'/></a>
                <AccessibilityMenu/>
            </nav>
        </div>
    )
}