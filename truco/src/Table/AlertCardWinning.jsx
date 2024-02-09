import { CloseAlert, DivMain, Overlay, TextAlert } from "./AlertsStyle"
import { useState } from "react";
import GetCardPlayed from "./GetCardPlayed";
const AlertCardWinning =  ({msg, handleClick, points})=>{
  
 

  let  usuarioLogado =  JSON.parse(localStorage.getItem("usuarioLogado"))
  let teamOneTurns = points.TeamOne[0].turnsWin
  let teamTwoTurns = points.TeamTwo[0].turnsWin

 if(msg){

  if(msg.newCard.player=== usuarioLogado.name){
    msg.newCard.player = 'você'
  }
 }
  
  
    return( 
 
      <>{
        teamOneTurns >=2 ||teamTwoTurns>=2?
        <Overlay>
          
        <DivMain>
        <p style={{fontWeight:'bold', fontFamily:'Arial, Helvetica, sans-serif', color:'white'}}>  
        
        {msg.newCard.team === usuarioLogado.team ? `seu time ganhou o round com a carta , outra rodada começou` : `Seu time perdeu o round, o adversário ganhou com a carta`}  </p>
            <TextAlert> {msg.newCard.card} </TextAlert>
            <CloseAlert onClick={handleClick}>Ok</CloseAlert>
        </DivMain > </Overlay>:
         <Overlay>
         <DivMain>
         <p style={{fontWeight:'bold', fontFamily:'Arial, Helvetica, sans-serif', color:'white'}}>  
         
         {msg.newCard.player === 'você'? `você ganhou com a carta , comece jogando` : `${msg.newCard.player} ganhou com a carta`}  </p>
             <TextAlert>  {GetCardPlayed(msg.newCard.card)} </TextAlert>
             <CloseAlert onClick={handleClick}>Ok</CloseAlert>
         </DivMain >
         </Overlay>
      }
     
        
        </>    
   )
   


}

export default AlertCardWinning
