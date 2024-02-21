import axios from "axios";
import socketService from "../../service/socketService";

const EscapeTruco = async (roomId, team, usuarioLogado) => {
    const socket = socketService.getSocket()
    const response = await axios.get(`http://localhost:3000/api/rooms?roomId=${roomId}`);
    const data = response.data;

      console.log(usuarioLogado)

        if(team==='TeamOne'){
             
            setTimeout(() => {
              const updatedPoints = Number(data.points.TeamOne[0].points) +1;
                  axios
                  .put(`http://localhost:3000/api/rooms/${roomId}/points`, {
                
                    teamOnePoints: updatedPoints,
                    teamOneTurnsWin: 0,
                    teamTwoTurnsWin: 0,
                    value:1,
                  })
                  .then((response) => {
                    console.log('Rounds resetados com sucesso:', response.data);
                  socket.emit('winningRound',{roomId,teamWinner:2,position:usuarioLogado.position, id:usuarioLogado.idv4, msg:'ESCAPE'})
                    
                  
                  })
                  .catch((error) => {
                    console.error('Erro ao resetar rounds:', error);
                  });
            },1000)
                  
                }
        
                if(team === 'TeamTwo'){
        
                  setTimeout(() => {
                    const updatedPoints = Number(data.points.TeamTwo[0].points) +1;
                  
                    axios
                    .put(`http://localhost:3000/api/rooms/${roomId}/points`, {
                   
                      teamTwoPoints: updatedPoints,
                      teamOneTurnsWin: 0,
                      teamTwoTurnsWin: 0,
                      value:1,
                    })
                    .then((response) => {
                      console.log('Rounds resetados com sucesso:', response.data);                 
                        socket.emit('winningRound',{roomId,teamWinner:1,position:usuarioLogado.position, id:usuarioLogado.idv4, msg:'ESCAPE'})       
                    })
                    .catch((error) => {
                      console.error('Erro ao resetar rounds:', error);
                    });
                  },1000)
                 
            
              }
            
        
    
        
  };

  export default EscapeTruco