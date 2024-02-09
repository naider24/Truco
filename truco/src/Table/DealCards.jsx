 import React from "react";
 import socketService from "../../service/socketService";
import axios from "axios";
 import { useParams } from "react-router-dom";
 
 export async function dealCards(roomId, winner) {
  const socket = socketService.getSocket()


    try {
      const response = await axios.get(`http://localhost:3000/api/rooms?roomId=${roomId}`);
      const data = response.data;

      if (!data) return;

      const { teams } = data;

    
      const teamOnePlayers = teams.TeamOne.filter(player => player.name !== '' && player.player !== 'não selecionado');
      const teamTwoPlayers = teams.TeamTwo.filter(player => player.name !== '' && player.player !== 'não selecionado');

      if (teamOnePlayers.length < 2 || teamTwoPlayers.length < 2) {
        alert('Número insuficiente de jogadores em um dos times. Adicione mais jogadores para começar o jogo.');
        return;
      }

      if (data.users && data.users.length > 0) {
        const users = data.users;
        const availableCards = [
          'AsCopas', 'AsPaus', 'Espadilha', 'AsOuros','AsCopas', 'ReiCopas', 'ReiOuros', 'ReiPaus',
          'RainhaCopas', 'RainhaOuros', 'RainhaPaus', 'ValeteCopas',
          'ValeteOuros', 'ValetePaus', 'TresCopas', 'TresOuros', 'TresPaus',
          'DoisCopas', 'DoisOuros', 'DoisPaus', 'Coringa', 'SeteOuros', 'SeteCopas', 'Zap'
        ];
        let newDistributedCards = {};

        users.forEach(user => {
          const userId = user;
        
          let playerInfo = {
            id: userId,
            cards: [],
            position: '',
          };
        
          let playerPosition = null;
        
          for (let j = 0; j < 3; j++) {
            if (availableCards.length > 0) {
              const randomCardIndex = Math.floor(Math.random() * availableCards.length);
              const card = availableCards[randomCardIndex];
        
              const findPlayerPosition = (team) => {
                return team.find(player => player.player === user);
              };
        
              if (teams.TeamOne.length > 0) {
                playerPosition = findPlayerPosition(teams.TeamOne);
              }
        
              if (!playerPosition && teams.TeamTwo.length > 0) {
                playerPosition = findPlayerPosition(teams.TeamTwo);
              }
        
              playerInfo.cards.push(card);
              availableCards.splice(randomCardIndex, 1);
            } else {
              break;
            }
          }
        
          playerInfo.position = playerPosition ? playerPosition.position : '';
          
          newDistributedCards[userId] = playerInfo;
        });
        
        
        const allDistributedCards = Object.values(newDistributedCards);
        
        console.log(allDistributedCards);

 
        socket.emit('dealCards', { roomId, distributedCards: allDistributedCards });
        
        // ...
        const updatedRoundData = {
          ...data.currentRound,
          roundFinished: false
        };

        await axios.put(`http://localhost:3000/api/rooms/${roomId}`, { currentRound: updatedRoundData });
     
      }
    } catch (error) {
      console.error('Erro ao obter usuários ou distribuir cartas:', error);
    }
  }

export default dealCards