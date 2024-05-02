import { useEffect, useState } from "react";
import GetCardPlayed from "./GetCardPlayed";
import axios from "axios";
import { CloseAlert, DivMain, Overlay, TextAlert } from "./AlertsStyle";

const AlertCardWinning = ({ msg, handleClick, roomId }) => {
  const [teamOneTurns, setTeamOneTurns] = useState(null);
  const [teamTwoTurns, setTeamTwoTurns] = useState(null);
  let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

 
 
  if (msg && msg.newCard.player === usuarioLogado.name) {
    msg.newCard.player = 'você';
  }



  return (
    <>
     <>
    <Overlay>
          
          <DivMain>
          <p style={{fontWeight:'bold', fontFamily:'Arial, Helvetica, sans-serif', color:'white'}}>  
          
          {msg.newCard.team === usuarioLogado.team ? `seu time ganhou o turno com a carta , outra rodada começou` : `Seu time perdeu o round, o adversário ganhou com a carta`}  </p>
              <TextAlert>  {GetCardPlayed(msg.newCard.card)}</TextAlert>
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
    </>
    </>
  );
};

export default AlertCardWinning;
