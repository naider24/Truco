import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socketService from "../../service/socketService";
import DealCards from "./DealCards";

function DistributeCards({ usuario }) {
  const { id } = useParams();
  const socket = socketService.getSocket();
  const roomId = id;
  const [cardsDistributed, setCardsDistributed] = useState(false);
  const [show,setShow] = useState(false)
  useEffect(() => {
    if (!usuario) return;
  
    const handleDistributeCards = ({ startingPosition, distributedCards }) => {
      if (!cardsDistributed) {
        console.log('cai na distribuição de cartas')
        const userIdFromLocalStorage = JSON.parse(localStorage.getItem('usuarioLogado')).idv4;
        let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  
        distributedCards.forEach((player) => {
          if (player.id === userIdFromLocalStorage) {
            const cards = player.cards;
            const position = player.position;
  
            if (cards) {
              usuarioLogado.cards = cards;
              usuarioLogado.position = position;
              usuarioLogado.roundInProgress = true;
              localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
              usuario = usuarioLogado;
            }
  
            if (usuarioLogado.position === startingPosition && player.id === userIdFromLocalStorage) {
              usuarioLogado.yourTurn = true;
              localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
              alert('Você começa');
              usuario = usuarioLogado;
            } else {
              usuarioLogado.yourTurn = false;
              localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
              usuario = usuarioLogado;
            }
  
            setCardsDistributed(true);
          }
        });
      }
    };
  
    socket.on('distributeCards', handleDistributeCards);
  
    return () => {
      socket.off('distributeCards', handleDistributeCards);
    };
  }, []);
  
  const showButton = () => {
    if (!usuario ) return null;

    if(!show){
      if (!usuario.roundInProgress && usuario.creator) {
        return (
          <button
            style={{
              position: 'absolute',
              padding: '20px',
              border: '2px solid white',
              borderRadius: '15px',
              top: '50%',
              left: '50%',
              cursor: 'pointer',
              zIndex: '1',
              transform: 'translate(-50%,-50%)',
              backgroundColor: '#FF6C6C',
              color: 'white',
              fontWeight: 'bold'
            }}
            onClick={handleClick}
          >
            Começar o jogo
          </button>
        );
      }
    };
    }
 

  const handleClick = async () => {
    if (!cardsDistributed) {
      await DealCards(roomId);
      setShow(true)
    }
  };

  return (
    <>
      {showButton()}
    </>
  );
}

export default DistributeCards;
