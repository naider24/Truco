

import axios from "axios";

async function VerificationWinningTruco(setMsg, roomId) {
  try {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    let msgWinner = '';
    const response = await axios.get(`http://localhost:3000/api/rooms?roomId=${roomId}`)
    const points = response.data.points
    const valuePoints =Number(response.data.points.TeamOne[0].points)
    const valueRound= Number(response.data.currentRound.Round[0].roundValue)
    console.log(valueRound)

      if (points.TeamOne[0].points >= 12 || points.TeamTwo[0].points >= 12) {
      
        if (points.TeamOne[0].points >= 12) {
          const teamWinner = 'TeamOne'
          const updatedPoints = valuePoints + valueRound;
          await axios
            .put(`http://localhost:3000/api/rooms/${roomId}/points`, {
              teamOnePoints: updatedPoints,
              teamOneTurnsWin: 0,
              teamTwoTurnsWin: 0,
              value: 1,
            }).then(() => {

              msgWinner = usuarioLogado.team === teamWinner ? 'O JOGO ACABOU SEU TIME VENCEU O TRUCO' : 'O JOGO ACABOU SEU TIME PERDEU O TRUCO';

              setMsg(msgWinner);
   
            })
        }
        if (points.TeamTwo[0].points >= 12) {
          const teamWinner = 'TeamTwo'
          const updatedPoints = valuePoints + + valueRound;
          await axios
            .put(`http://localhost:3000/api/rooms/${roomId}/points`, {
              teamTwoPoints: updatedPoints,
              teamOneTurnsWin: 0,
              teamTwoTurnsWin: 0,
              value: 1,
            }).then(() => {

              msgWinner = usuarioLogado.team === teamWinner ? 'O JOGO ACABOU SEU TIME VENCEU O TRUCO' : 'O JOGO ACABOU SEU TIME PERDEU O TRUCO';

              setMsg(msgWinner);

             

           
            })
        }
   return true
    }
    return false
  } catch (error) {
       console.log(error)
  }


}

export default VerificationWinningTruco