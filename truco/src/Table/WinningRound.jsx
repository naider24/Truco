import Alerts from "./AlertCardWinning";
import GetCardPlayed from "./GetCardPlayed";
import React from "react";
import { useState } from "react";
import axios from "axios";
const WinningRound = async  (playedCards, roomId) => {

 

    const cardValues = playedCards.map((card) => {
      switch (card.card) {
        case 'Zap':
          return 100;
        case 'SeteCopas':
          return 90;
        case 'Espadilha':
          return 80;
          case 'SeteOuros':
          return 75;
        case 'Coringa':
          return 70;
          case 'TresPaus':
            case'TresOuros':
            case 'TresCopas':
          return 60;
        case 'DoisPaus':
        case'DoisOuros':
        case 'DoisCopas':
             
          return 50;
        case 'AsOuros':
        case 'AsCopas':
        case 'AsPaus':
          return 40;
        case 'ReiEspadas':
        case 'ReiCopas':
        case 'ReiPaus':
          return 30;
        case 'RainhaEspadas':
        case 'RainhaCopas':
        case 'RainhaPaus':
          return 20;
        case 'ValeteEspadas':
        case 'ValeteCopas':
        case 'ValetePaus':
          return 10;
        default:
          return 0;
      }
    });
    try {
      const maxCardValue = Math.max(...cardValues);
      const winningIndex = cardValues.indexOf(maxCardValue);
      const winningPlayer = playedCards[winningIndex].player;
      const winningCard = playedCards[winningIndex].card;
    
      const response = await axios.get(`http://localhost:3000/api/rooms?roomId=${roomId}`);
      const roomData = response.data;
    
      const winningPlayerId = winningPlayer;
      const teams = roomData.teams;
    
      let winningPosition = null;
      let winningTeam = null;

      for (const teamKey in teams) {
        const players = teams[teamKey];
    
        for (const player of players) {
          if (player.player === winningPlayerId) {
            const winningPlayerName = player.name;
            winningPosition = player.position; 
            winningTeam = teamKey;
         
            const msg = {
              newCard: {
                card: winningCard,
                player: winningPlayerName,
                idPlayer: winningPlayerId,
                position: winningPosition,
                team: winningTeam,
              },
            };
    
            return msg;
          }
        }
      }
    
      console.log('Jogador vencedor não encontrado.');
    } catch (error) {
      console.error('Erro ao buscar os dados da sala:', error);
      throw error; // Lança o erro para ser tratado externamente
    }
  


    
}
    
  

  export default WinningRound