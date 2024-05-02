import { AsCopas, AsEspadas, AsOuros, AsPaus, Coringa, DivCard, DoisCopas, DoisEspadas, DoisOuros, DoisPaus, RainhaCopas, RainhaEspadas, RainhaOuros, RainhaPaus, ReiCopas, ReiEspadas, ReiOuros, ReiPaus, SeteCopas, SeteOuros, TresCopas, TresEspadas, TresOuros, TresPaus, ValeteCopas, ValeteEspadas, ValeteOuros, ValetePaus, Zap, VerseCardRed } from "../Cards/cardStyle"

import { CardsInhandDown, DivTable, CardsInhandTop, CardsInhandLeft, CardsInhandRight, CardInTableDown, CardInTableRight, CardInTableTop, CardInTableLeft, CardsPlayed, DivPoints, TitlePoints, Points, Team, RoundValue } from "./tableStyle"
import { useState, useEffect } from "react"
import { Await, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import PlayerRegistration from "./PlayerRegistration";
import { useNavigate } from "react-router-dom";
import DistributeCards from "./DistributeCards";
import GetCards from "./GetCards";
import socketService from "../../service/socketService";
import GetCardPlayed from "./GetCardPlayed";
import RenderPlayedCard from "./RenderPlayedCard";
import WinningRound from "./WinningRound";
import dealCards from "./DealCards";
import { GiTruce } from "react-icons/gi";
import addPointsToWinner from "./addPointsForWinner";
import { TeamWinner } from "./AlertsStyle";
import AskTruco from "./AskTruco";
import AlertCardWinning from "./AlertCardWinning";
import  VerificationWinningTruco  from "./VerificationWinningTruco";
  function Table() {
  const { id } = useParams();
  const roomId = id
  const navigate = useNavigate();
  const socket = socketService.getSocket()
  const [playedCard, setPlayedCard] = useState();
  let usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  const [msg, setMsg] = useState();
  const [points, setPoints] = useState()
  const [data, setData] = useState()
  const [msgWinnerRound, setMsgWinnerRound] = useState()
  const [showAlert, setShowAlert] = useState()




  let [roundValue, setRoundValue] = useState(1)
  useEffect(() => {

    if (!usuario)
      return navigate(`/enterRoom/${roomId}`);

    if (usuario.room !== roomId) {

      localStorage.removeItem("usuarioLogado");

      return navigate(`/enterRoom/${roomId}`)
    }

    usuario = JSON.parse(localStorage.getItem("usuarioLogado"))
    fetchRoomData()

    const cleanupPreviousEvents = () => {
      socket.off('winningTurns',  handleWinningTurn);
      socket.off('playedCard', handlePlayedCard);
      socket.off('turn', handleTurn);
      socket.off('winningRounds', handleWinning);

    };

    socket.on('winningTurns', handleWinningTurn)
    socket.on('playedCard', handlePlayedCard);
    socket.on('turn', handleTurn);
    socket.on('winningRounds', handleWinning);

    return cleanupPreviousEvents;
  }, []);

  const handleWinningTurn = async (playerData) => {

    usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    try {
      await fetchRoomData()


      if (playerData.playerData.idPlayer === usuario.idv4) {

        usuario.yourTurn = true
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

      }


      usuario.yourTurn = false

    } catch (error) {
      console.log('deu ruim')
    }

  }
  const handlePlayedCard = (playedCards) => {
    GetCardsPlayedData();

  };

  const handleTurn = (position) => {
    usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    const nextPosition = getNextPosition(position);


    if (nextPosition === usuario.position) {
      usuario.yourTurn = true;
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    } else {
      usuario.yourTurn = false;
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    }
  };
  const handleWinning = async (team) => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    let msgWinner = '';
    const teamWinner = team.winner === 2 ? 'TeamTwo' : 'TeamOne'



    try {


      const verification = await VerificationWinningTruco( setMsgWinnerRound, roomId)
      console.log(verification)
      if (verification) {
        
        return fetchRoomData()
      }else{
        if (usuarioLogado.team === teamWinner) {

      
  
  
          if (team.msg === "NORMAL") {
            msgWinner = usuarioLogado.team === teamWinner ? 'SEU TIME GANHOU A RODADA' : 'SEU TIME PERDEU A RODADA';
          }
          else if (team.msg === "ESCAPE") {
            msgWinner = usuarioLogado.team === teamWinner ? 'O ADVERSÁRIO FUGIU DO TRUCO E SEU TIME GANHOU 1 PONTO' : 'SEU TIME FUGIU DO TRUCO E VOCE PERDEU 1 PONTO';
  
          }
  
  
        } else {
  
  
          if (team.msg=== "NORMAL") {
            msgWinner = usuarioLogado.team === teamWinner ? 'SEU TIME GANHOU A RODADA' : 'SEU TIME PERDEU A RODADA';
  
          }
  
          else if (team.msg === "ESCAPE") {
            msgWinner = usuarioLogado.team === teamWinner ? 'O ADVERSÁRIO FUGIU DO TRUCO E SEU TIME GANHOU 1 PONTO' : 'SEU TIME FUGIU DO TRUCO E VOCE PERDEU 1 PONTO';
  
          }
  
  
        }
  
  
  
        setMsgWinnerRound(msgWinner);
        fetchRoomData()
        dealCards(roomId);
        setTimeout(() => {
          setMsgWinnerRound('');
        }, 3000);
  
  
      }
   

    } catch (error) {
      console.log(error)
    }
  };



  const GetCardsPlayedData = async () => {

    try {
      const response = await axios.get(`http://localhost:3000/api/rooms?roomId=${roomId}`);
      const cardsPlayed = response.data.currentRound.cardsPlayed;

      setPlayedCard(cardsPlayed);

      const allPlayedCard = checkAllPositionsPlayed(cardsPlayed);
      if (allPlayedCard) {

        try {
          const msg = await WinningRound(cardsPlayed, roomId);
          setMsg(msg);

          handleClearCardsPlayed()

          if (msg) {


            const response = await axios.get(`http://localhost:3000/api/rooms?roomId=${roomId}`);
            const roundValue = response.data.currentRound.Round[0].roundValue

            await addPointsToWinner(roundValue, msg, roomId, setShowAlert)

            await fetchRoomData()
          }

        } catch (error) {
          console.error('Erro ao processar WinningRound:', error);

        }
      }
    } catch (error) {
      console.error('Erro ao obter as cartas jogadas:', error);
    }

  };



  const getNextPosition = (currentPosition) => {
    const positions = ['down', 'right', 'top', 'left'];
    const currentIndex = positions.indexOf(currentPosition);
    const nextPosition = positions[(currentIndex + 1) % positions.length];


    return nextPosition;
  };


  const checkAllPositionsPlayed = (playedCards) => {
    let positionsSet = new Set();

    for (const card of playedCards) {
      positionsSet.add(card.position);
    }


    if (positionsSet.size === 4) {
      positionsSet = new Set()
      return true
    }
    return false
  };

  const handleCardClick = (position, card) => {

    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))

    if (usuarioLogado.yourTurn) {

      const playerId = JSON.parse(localStorage.getItem('usuarioLogado')).idv4;


      const dataToUpdate = {
        newCard: {
          player: playerId,
          card: card,
          position: position
        }
      };

      axios
        .put(`http://localhost:3000/api/rooms/${roomId}`, dataToUpdate)
        .then((response) => {
          if (!usuarioLogado.position) return alert('deu errado a position')
          socket.emit('turns', { roomId, position: dataToUpdate.newCard.position })
          socket.emit('playedCards', { roomId, newCard: dataToUpdate.newCard });



        })
        .catch((error) => {
          console.error('Erro ao registrar a carta jogada:', error);
        });
      return
    };

    alert('não é sua vez de jogar')

  }


  const fetchRoomData = async () => {
    try {

      const response = await axios.get(`http://localhost:3000/api/rooms?roomId=${roomId}`);


      setData(response.data)
      setPoints(response.data.points)
      setRoundValue(response.data.currentRound.Round[0].roundValue)


    } catch (error) {
      console.error('Erro ao buscar os dados da sala:', error);
    }
  };

  const TablePoints = () => {

    if (points) {
      let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
      if (usuarioLogado.team === 'TeamTwo') {
        return (
          <DivPoints>
            <TitlePoints>Pontos</TitlePoints>
            <Team>seu time</Team><Team>adversário</Team>
            <Points>{points.TeamTwo[0].points}</Points>
            <Points>{points.TeamOne[0].points}</Points>
          </DivPoints>

        )
      }

      return (
        <DivPoints>
          <TitlePoints>Pontos</TitlePoints>
          <Team>seu time</Team><Team>time inimigo</Team>
          <Points>{points.TeamOne[0].points}</Points>
          <Points>{points.TeamTwo[0].points}</Points>
        </DivPoints>

      )

    } else {

      return (<DivPoints>
        <TitlePoints>Pontos</TitlePoints>
        <Team>seu time</Team><Team>time inimigo</Team>
        <Points>0</Points>
        <Points>0</Points>
      </DivPoints>)
    }
  }

  const TableTurns = () => {

    if (points) {
      let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
      if (usuarioLogado.team === 'TeamTwo') {
        return (
          <DivPoints style={{ left: '1%' }}>
            <TitlePoints>Turnos Vencidos</TitlePoints>
            <Team>seu time</Team><Team>adversário</Team>
            <Points>{points.TeamTwo[0].turnsWin}</Points>
            <Points>{points.TeamOne[0].turnsWin}</Points>
          </DivPoints>

        )
      }

      return (
        <DivPoints style={{ left: '1%' }}>
          <TitlePoints>Turnos Vencidos</TitlePoints>
          <Team>seu time</Team><Team>time inimigo</Team>
          <Points>{points.TeamOne[0].turnsWin}</Points>
          <Points>{points.TeamTwo[0].turnsWin}</Points>
        </DivPoints>

      )

    } else {

      return (<DivPoints style={{ left: '1%' }}>
        <TitlePoints>Turnos Vencidos</TitlePoints>
        <Team>seu time</Team><Team>time inimigo</Team>
        <Points>0</Points>
        <Points>0</Points>
      </DivPoints>)
    }
  }



  const handleClearCardsPlayed = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/rooms/${roomId}/clear-cards-played`);

      setPlayedCard(null)
    } catch (error) {
      console.error('Erro ao limpar os registros de cardsPlayed:', error);

    }
  };


  const handleCloseAlert = () => {

    setShowAlert(false)
    setMsg(null)
  }


  const handleClick = async () => {
    await dealCards(roomId);

  };


  return (<>

    <DivTable>

      {showAlert ?
        <><AlertCardWinning
          roomId={roomId}
          msg={msg}
          handleClick={handleCloseAlert}
          points={points}
        ></AlertCardWinning></> : ''}
      <TablePoints ></TablePoints>
      <TableTurns></TableTurns>
      {points ? <AskTruco
        msg={msg}

        roomId={roomId}
        turnsTeamOne={points.TeamOne[0].turnsWin}
        turnsTeamTwo={points.TeamTwo[0].turnsWin}
        valueRound={roundValue}
        data={data}
        fetchRoomdata={fetchRoomData}
      >


      </AskTruco> : <div style={{ color: 'white' }}>acabou o round</div>}


      <RoundValue>

        {roundValue === 1 ? `VALOR DA RODADA : ${roundValue} PONTO` : `VALOR DA RODADA : ${roundValue} PONTOS`}

      </RoundValue>
      <TeamWinner>{msgWinnerRound}</TeamWinner>
      <CardsPlayed><RenderPlayedCard playedCard={playedCard} getCardPlayed={GetCardPlayed} ></RenderPlayedCard></CardsPlayed>
      <PlayerRegistration></PlayerRegistration>
      <button onClick={handleClearCardsPlayed}>Limpar Cartas Jogadas</button>
      <button onClick={handleClick}>distribuir cartas</button>
      <DistributeCards usuario={usuario}></DistributeCards>

      <CardsInhandRight>
        <VerseCardRed></VerseCardRed>
        <VerseCardRed></VerseCardRed>
        <VerseCardRed></VerseCardRed>
      </CardsInhandRight>
      <CardsInhandLeft>


        <VerseCardRed></VerseCardRed>
        <VerseCardRed></VerseCardRed>
        <VerseCardRed></VerseCardRed>
      </CardsInhandLeft>
      <CardsInhandTop>


        <VerseCardRed></VerseCardRed>
        <VerseCardRed></VerseCardRed>
        <VerseCardRed></VerseCardRed>
      </CardsInhandTop>
      <CardsInhandDown >

        <GetCards handleClick={handleCardClick} usuario={usuario}></GetCards>
      </CardsInhandDown>"
    </DivTable>
  </>)
}

export default Table