interface Props{
    porcentagem: number; 
    tamanho?: number;
    tracoT?: number; //espessura
}

export default function CirculoProgresso({
    porcentagem,
    tamanho = 120,
    tracoT = 10
}: Props){
    const radius = (tamanho - tracoT) / 2;
    const circumferencia = 2 * Math.PI * radius;
    const offset = circumferencia - (porcentagem / 100) * circumferencia;

    return(
        <div className="flex items-center justify-center">
            <svg width={tamanho} height={tamanho}>

                {/*Circulo do fundo*/}
                <circle
                    stroke='#2E315B'
                    fill='transparent'
                    strokeWidth={tracoT}
                    r={radius}
                    cx={tamanho / 2}
                    cy={tamanho / 2}
                />

                {/*Circulo de progresso*/}

                <circle
                    stroke='#7A80F4'
                    fill='transparent'
                    strokeWidth={tracoT}
                    strokeLinecap='round'
                    r={radius}
                    cx={tamanho / 2}
                    cy={tamanho / 2}
                    strokeDasharray={circumferencia}
                    strokeDashoffset={offset}
                    transform={`rotate(-90 ${tamanho/2} ${tamanho/2})`}
                />

                {/*Texto de dentro*/}
                <text
                    x='50%'
                    y='50%'
                    textAnchor='middle'
                    dy='.3em'
                    className="fill-white text-xl font-bold cursor-default">
                    {porcentagem}%
                </text>
            
            </svg>
        </div>
    )
}