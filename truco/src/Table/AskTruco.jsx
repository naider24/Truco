import { ButtonAsk } from "./AskTrucoStyle"
import socketService from "../../service/socketService"
import { useEffect, useState } from "react"
import AlertTruco from "./AlertTruco"
import { Overlay, TeamWinner } from "./AlertsStyle"
import EscapeTruco from "./EscapeTruco"
function AskTruco({roomId, turnsTeamOne, turnsTeamTwo, valueRound, fetchRoomdata,}) {

    
    const socket = socketService.getSocket()
    const [alert,setShowAlert]= useState(false)

    const [answerAwaiting, setAnswerAwaiting] = useState()
    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
    useEffect(()=>{


        const cleanupPreviousEvents = () => {
            socket.off('RejectTruco');
            socket.off('AcceptTruco');
        
            
          };
        socket.on('Truco',(nextPosition)=>{

          
            let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
             if(usuarioLogado.position === nextPosition){
             
                usuarioLogado.trucoInProgress = 'request'
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
             }
             if(usuarioLogado.position !== nextPosition){
                usuarioLogado.trucoInProgress = 'awaitingAnswer'
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
              
             
             }
        })

     

        socket.on('RejectTruco',(team,usuarioLogado)=>{
           
           

            EscapeTruco(roomId,team,usuarioLogado)
            fetchRoomdata()
            let usuario = JSON.parse(localStorage.getItem("usuarioLogado"))
            usuario.trucoInProgress = ''
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario))
        })

        socket.on('AcceptTruco',(data)=>{
           
            setAnswerAwaiting(false)
            fetchRoomdata()
            let usuario = JSON.parse(localStorage.getItem("usuarioLogado"))
            usuario.trucoInProgress = ''
            localStorage.setItem('usuarioLogado', JSON.stringify(usuario))
           
         })

         return(cleanupPreviousEvents)
    },[])

    function HandleClick (){
        let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
        usuarioLogado.trucoInProgress = ''
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))
    }
  
 
    const getNextPosition = (currentPosition) => {
        const positions = ['down', 'right', 'top', 'left'];
        const currentIndex = positions.indexOf(currentPosition);
        const nextPosition = positions[(currentIndex + 1) % positions.length];
    
       
        return nextPosition;
      };
    function Truco () {
        let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
        const nextPosition = getNextPosition(usuarioLogado.position);
      socket.emit('truco',{roomId, nextPosition:nextPosition})
    }

     
  function AwaitingAnswer({usuarioLogado}){
    
  
        return(
            <>
            
             {
            usuarioLogado.trucoInProgress ==='request'? <Overlay>
                 <div onClick={HandleClick}></div>
                 <AlertTruco
             
                     roomId={roomId}
                     valueRound={valueRound}
                     setShowAlert={setShowAlert}
                     fetchRoomdata={fetchRoomdata}
                     setAnswerAwaiting= {setAnswerAwaiting}
                 />
             </Overlay> :''
         }
         { usuarioLogado.trucoInProgress ==='awaitingAnswer' ? <Overlay>
         <div onClick={HandleClick}>perta</div>
                 <TeamWinner>um truco foi pedido aguarde a resposta</TeamWinner>
             </Overlay> :''

         } :''
            </>
        )
      
    
  }

    return (
        <>
          
            {
                turnsTeamOne>0 && valueRound < 12 || turnsTeamTwo>0 && valueRound < 12?
                    <ButtonAsk onClick={Truco}>PEDIR TRUCO</ButtonAsk>
                    : ''
            }
         <AwaitingAnswer usuarioLogado={usuarioLogado}></AwaitingAnswer>
        </>
    )
}

export default AskTruco
