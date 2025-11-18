import '../assets/style.css'
import {Gear, DownloadSimple, LockOpen, ArrowCounterClockwise} from '@phosphor-icons/react';
import SettingButton from '../components/SettingButton.tsx'

export default function Configuracoes(){
    return(
        <main className='px-10 py-8 flex flex-col gap-y-8'>
            <section className='flex text-white gap-x-2 font-extrabold items-end justify-center'>
                <h1 className='text-3xl'>CONFIGURAÇÃO</h1>
                <Gear size={32} weight='fill'/>
            </section>
            <section className='flex w-full flex-wrap gap-y-4'>
                <SettingButton>
                    <DownloadSimple size={24} weight='fill'/>
                    Download do diário
                </SettingButton>
                <SettingButton>
                    <LockOpen size={24} weight='fill'/>
                    Alterar senha
                </SettingButton>
                <SettingButton>
                    <ArrowCounterClockwise size={24} weight='fill'/>
                    Resetar informações
                </SettingButton>
            </section>
        </main>
    )
}