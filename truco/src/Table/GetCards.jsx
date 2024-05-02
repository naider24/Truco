import React, { useEffect , useState} from "react";
import { AsCopas, AsEspadas, AsOuros, AsPaus, Coringa, DivCard, DoisCopas, DoisEspadas, DoisOuros, DoisPaus, RainhaCopas, RainhaEspadas, RainhaOuros, RainhaPaus, ReiCopas, ReiEspadas, ReiOuros, ReiPaus, SeteCopas, SeteOuros, TresCopas, TresEspadas, TresOuros, TresPaus, ValeteCopas, ValeteEspadas, ValeteOuros, ValetePaus, Zap } from "../Cards/cardStyle"

import socketService from "../../service/socketService";
 function GetCards ({usuario ,handleClick}) {

  const [cards, setCards] = useState([]);

  
  useEffect(() => {
    
    if (!usuario){
      return
    } 

    const player = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (player) {
      setCards(player.cards);
      
    }
    
    socketService.getSocket().on('distributeCards', (distributedCards) => {
      const player = JSON.parse(localStorage.getItem('usuarioLogado'));

      
      setCards(player.cards);
     
    
      
    }

    );

    
    socketService.getSocket().on('playedCard',(playedCard)=>{

        
   
      let  usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
      if(usuarioLogado.idv4 === playedCard.newCard.player){
        usuarioLogado.cards = usuarioLogado.cards.filter((c) => c !== playedCard.newCard.card); 
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        setCards(usuarioLogado.cards)
      }
    
     })
 
  }, []);

  
 
    
  const getCard = card => {
    let  usuarioLogado =  JSON.parse(localStorage.getItem("usuarioLogado"))
    usuario = usuarioLogado
    switch (card) {
      case 'AsPaus':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} style={{ backgroundColor: 'black' }}>
            <AsPaus></AsPaus>
          </DivCard>
        );
      case 'AsOuros':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card}>
            <AsOuros></AsOuros>
          </DivCard>
        );
      case 'Espadilha':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} style={{ marginLeft: '0px', backgroundColor: 'white' }}>
            <AsEspadas></AsEspadas>
          </DivCard>
        );
      case 'AsCopas':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card}>
            <AsCopas></AsCopas>
          </DivCard>
        );

      case 'ReiEspadas':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} style={{ backgroundColor: 'black' }}>
            <ReiEspadas></ReiEspadas>
          </DivCard>
        );
      case 'ReiCopas':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} >
            <ReiCopas></ReiCopas>
          </DivCard>
        );
      case 'ReiOuros':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} >
            <ReiOuros></ReiOuros>
          </DivCard>
        );
      case 'ReiPaus':
        return (
          <DivCard  onClick={()=>handleClick(usuario.position, card)}id={card}style={{ backgroundColor: 'black' }}>
            <ReiPaus></ReiPaus>
          </DivCard>
        );

      case 'RainhaEspadas':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card}>
            <RainhaEspadas></RainhaEspadas>
          </DivCard>
        );
      case 'RainhaCopas':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card}>
            <RainhaCopas></RainhaCopas>
          </DivCard>
        );
      case 'RainhaOuros':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card}>
            <RainhaOuros></RainhaOuros>
          </DivCard>
        );
      case 'RainhaPaus':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} style={{ backgroundColor: 'black' }}>
            <RainhaPaus></RainhaPaus>
          </DivCard>
        );

      case 'DoisEspadas':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} style={{ marginLeft: '0px', }}>
            <DoisEspadas></DoisEspadas>
          </DivCard>
        );
      case 'DoisCopas':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card}>
            <DoisCopas></DoisCopas>
          </DivCard>
        );
      case 'DoisOuros':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} >
            <DoisOuros></DoisOuros>
          </DivCard>
        );
      case 'DoisPaus':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} style={{ backgroundColor: 'black' }}>
            <DoisPaus></DoisPaus>
          </DivCard>
        );

      case 'TresEspadas':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} style={{ backgroundColor: 'black' }}>
            <TresEspadas></TresEspadas>
          </DivCard>
        );
      case 'TresCopas':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card}>
            <TresCopas></TresCopas>
          </DivCard>
        );
      case 'TresOuros':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} >
            <TresOuros></TresOuros>
          </DivCard>
        );
      case 'TresPaus':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} style={{ backgroundColor: 'black' }}>
            <TresPaus></TresPaus>
          </DivCard>
        );

      case 'ValeteEspadas':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} style={{ backgroundColor: 'black' }}>
            <ValeteEspadas></ValeteEspadas>
          </DivCard>
        );
      case 'ValeteCopas':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} >
            <ValeteCopas></ValeteCopas>
          </DivCard>
        );
      case 'ValeteOuros':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} name={card} >
            <ValeteOuros></ValeteOuros>
          </DivCard>
        );
      case 'ValetePaus':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} style={{ backgroundColor: 'black' }}>
            <ValetePaus></ValetePaus>
          </DivCard>
        );
      case 'Zap':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} style={{ backgroundColor: 'white' }}>
            <Zap></Zap>
          </DivCard>
        );
      case 'Coringa':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} style={{ backgroundColor: 'white' }}>
            <Coringa></Coringa>
          </DivCard>
        );
      case 'SeteCopas':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} style={{ backgroundColor: 'white' }}>
            <SeteCopas></SeteCopas>
          </DivCard>
        );
        case 'SeteOuros':
        return (
          <DivCard onClick={()=>handleClick(usuario.position, card)} id={card} style={{ backgroundColor: 'white' }}>
            <SeteOuros></SeteOuros>
          </DivCard>
        );
      default:
        return null;
    }
  }

  const renderPlayerCards = () => {
    if (cards && cards.length > 0) {
      return cards.map((card, index) => (
        <div key={index}>
          {getCard(card)}
        </div>
      ));
    }

    return null;
  };


  return(
    <>
   {renderPlayerCards()}
    </>
  )

 }

 export default GetCards