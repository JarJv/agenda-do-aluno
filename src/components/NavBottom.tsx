import '../assets/style.css'
import {House, PersonArmsSpread, SignOut} from '@phosphor-icons/react';

export default function NavBottom(){
    return(
        <div className='fixed bottom-0 left-0 right-0'>
            <nav className='flex justify-between items-center px-6 py-8'>
                <SignOut color='#fff' size={32} weight='bold' className='transform duration-100 active:scale-120'/>
                <House color='#fff' size={32} weight='fill' className='transform duration-100 active:scale-120'/>
                <PersonArmsSpread color='#fff' size={32} weight='fill' className='transform duration-100 active:scale-120'/>
            </nav>
        </div>
    )
}