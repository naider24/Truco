import axios from "axios";
import socketService from "../../service/socketService";
const addPointsToWinner = async (points ,msg, roomId) => {

 const socket = socketService.getSocket()

 
 console.log(points)

  const checkAndResetRounds = async (roomId) => {
    const response = await axios.get(`http://localhost:3000/api/rooms?roomId=${roomId}`);
    const data = response.data;
  
    const teamOneTurnsWin = data.points.TeamOne[0].turnsWin;
    const teamTwoTurnsWin = data.points.TeamTwo[0].turnsWin;
  
   
      if(teamOneTurnsWin >=2 || teamTwoTurnsWin >= 2){
        if(teamOneTurnsWin >=2){
             
    setTimeout(() => {
      const updatedPoints = Number(data.points.TeamOne[0].points) +points;
          axios
          .put(`http://localhost:3000/api/rooms/${roomId}/points`, {
        
            teamOnePoints: updatedPoints,
            teamOneTurnsWin: 0,
            teamTwoTurnsWin: 0,
            value:1,
          })
          .then((response) => {
            console.log('Rounds resetados com sucesso:', response.data);
           
              socket.emit('winningRound',{roomId,teamWinner:1,position:msg.newCard.position, id:msg.newCard.idPlayer, msg:'NORMAL'})
       
          })
          .catch((error) => {
            console.error('Erro ao resetar rounds:', error);
          });
    },1000)
          
        }

        if(teamTwoTurnsWin >=2){

          setTimeout(() => {
            const updatedPoints = Number(data.points.TeamTwo[0].points) +points;
          
            axios
            .put(`http://localhost:3000/api/rooms/${roomId}/points`, {
           
              teamTwoPoints: updatedPoints,
              teamOneTurnsWin: 0,
              teamTwoTurnsWin: 0,
              value:1,
            })
            .then((response) => {
              console.log('Rounds resetados com sucesso:', response.data);
              socket.emit('winningRound',{roomId,teamWinner:2,position:msg.newCard.position, id:msg.newCard.idPlayer, msg:'NORMAL'})
            })
            .catch((error) => {
              console.error('Erro ao resetar rounds:', error);
            });
          },1000)
         
        }
        return true
      }
    
    return false
    
  };

 

    const response = await axios.get(`http://localhost:3000/api/rooms?roomId=${roomId}`);
    const data = response.data;

    const teamOnePlayers = data.teams.TeamOne;
    const teamTwoPlayers = data.teams.TeamTwo;

    const winningPlayerId = msg.newCard.idPlayer;

    const playerInTeamOne = teamOnePlayers.find((player) => player.player === winningPlayerId);
    const playerInTeamTwo = teamTwoPlayers.find((player) => player.player === winningPlayerId);
  
   
  try{
 const roundsReseted = await checkAndResetRounds(roomId);
   
      if (playerInTeamOne) {
     
 
        if(!roundsReseted){
          
          const updatedRoundsWin = Number(data.points.TeamOne[0].turnsWin) + 1;
     
          axios
            .put(`http://localhost:3000/api/rooms/${roomId}/points`, {
          
              teamOneTurnsWin: updatedRoundsWin,
           
          
            })
            .then((response) => {
              console.log('Pontos e rodadas vencidas atualizados com sucesso:', response.data);
             
                socket.emit('winningTurn',{roomId,playerData:msg.newCard})
              
            })
            .catch((error) => {
              console.error('Erro ao atualizar pontos e rodadas vencidas:', error);
            });
        }
        checkAndResetRounds(roomId)
      } else if (playerInTeamTwo) {
  
  
        if(!roundsReseted){
         
          const updatedRoundsWin = Number(data.points.TeamTwo[0].turnsWin) + 1;
  
          axios
            .put(`http://localhost:3000/api/rooms/${roomId}/points`, {
        
              
              teamTwoTurnsWin: updatedRoundsWin,
         
            })
            .then((response) => {
              console.log('Pontos e rodadas vencidas atualizados com sucesso:', response.data);
           
                socket.emit('winningTurn',{roomId,playerData:msg.newCard})
              
            })
            .catch((error) => {
              console.error('Erro ao atualizar pontos e rodadas vencidas:', error);
            });
        }
        checkAndResetRounds(roomId)
        }
       
    
   
  }catch (error) {
    console.error('Erro ao obter dados da sala:', error);
  }
   
    
    
   
    
  
};

export default addPointsToWinner;