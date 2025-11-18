import '../assets/style.css'
import BlueFilledButtom from'../components/BlueFilledButton'
import BordedButton from '../components/BordedButton.tsx'



export default function Calendario(){
    return(

    <div> 
    
        <div>
            <BlueFilledButtom>
                Março
                </BlueFilledButtom>  
                
                    
        
        </div>

        <div id="calendario-container">
            <p className="text-white text-lg font-bold">Março</p>
                        
        </div>

        <div id="legenda-calendario">
            <p className="text-green-400 text-lg font-bold">Letivo</p>
            <p className="text-yellow-300 text-lg font-bold">Falta</p>
            <p className="text-red-600 text-lg font-bold">Não letivo</p>
        </div>


    </div>    
    )
}