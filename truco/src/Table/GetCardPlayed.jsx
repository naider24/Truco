         
         import {AsCopas, AsEspadas, AsOuros, AsPaus, Coringa, DivCard, DoisCopas, DoisEspadas, DoisOuros, DoisPaus, RainhaCopas, RainhaEspadas, RainhaOuros, RainhaPaus, ReiCopas, ReiEspadas, ReiOuros, ReiPaus, SeteCopas, SeteOuros, TresCopas, TresEspadas, TresOuros, TresPaus, ValeteCopas, ValeteEspadas, ValeteOuros, ValetePaus, Zap ,VerseCardRed} from "../Cards/cardStyle"
  const GetCardPlayed = card => {
    switch (card) {
      case 'AsPaus':
        return (
          <DivCard id={card} style={{ backgroundColor: 'black' }}>
            <AsPaus></AsPaus>
          </DivCard>
        );
      case 'AsOuros':
        return (
          <DivCard  id={card}>
            <AsOuros></AsOuros>
          </DivCard>
        );
      case 'Espadilha':
        return (
          <DivCard  id={card} style={{ marginLeft: '0px', backgroundColor: 'white' }}>
            <AsEspadas></AsEspadas>
          </DivCard>
        );
      case 'AsCopas':
        return (
          <DivCard  id={card}>
            <AsCopas></AsCopas>
          </DivCard>
        );

      case 'ReiEspadas':
        return (
          <DivCard  id={card} style={{ backgroundColor: 'black' }}>
            <ReiEspadas></ReiEspadas>
          </DivCard>
        );
      case 'ReiCopas':
        return (
          <DivCard  id={card} >
            <ReiCopas></ReiCopas>
          </DivCard>
        );
      case 'ReiOuros':
        return (
          <DivCard  id={card} >
            <ReiOuros></ReiOuros>
          </DivCard>
        );
      case 'ReiPaus':
        return (
          <DivCard  id={card}style={{ backgroundColor: 'black' }}>
            <ReiPaus></ReiPaus>
          </DivCard>
        );

      case 'RainhaEspadas':
        return (
          <DivCard  id={card}>
            <RainhaEspadas></RainhaEspadas>
          </DivCard>
        );
      case 'RainhaCopas':
        return (
          <DivCard  id={card}>
            <RainhaCopas></RainhaCopas>
          </DivCard>
        );
      case 'RainhaOuros':
        return (
          <DivCard  id={card}>
            <RainhaOuros></RainhaOuros>
          </DivCard>
        );
      case 'RainhaPaus':
        return (
          <DivCard  id={card} style={{ backgroundColor: 'black' }}>
            <RainhaPaus></RainhaPaus>
          </DivCard>
        );

      case 'DoisEspadas':
        return (
          <DivCard  id={card} style={{ marginLeft: '0px', }}>
            <DoisEspadas></DoisEspadas>
          </DivCard>
        );
      case 'DoisCopas':
        return (
          <DivCard  id={card}>
            <DoisCopas></DoisCopas>
          </DivCard>
        );
      case 'DoisOuros':
        return (
          <DivCard id={card} >
            <DoisOuros></DoisOuros>
          </DivCard>
        );
      case 'DoisPaus':
        return (
          <DivCard  id={card} style={{ backgroundColor: 'black' }}>
            <DoisPaus></DoisPaus>
          </DivCard>
        );

      case 'TresEspadas':
        return (
          <DivCard  id={card} style={{ backgroundColor: 'black' }}>
            <TresEspadas></TresEspadas>
          </DivCard>
        );
      case 'TresCopas':
        return (
          <DivCard  id={card}>
            <TresCopas></TresCopas>
          </DivCard>
        );
      case 'TresOuros':
        return (
          <DivCard  id={card} >
            <TresOuros></TresOuros>
          </DivCard>
        );
      case 'TresPaus':
        return (
          <DivCard  id={card} style={{ backgroundColor: 'black' }}>
            <TresPaus></TresPaus>
          </DivCard>
        );

      case 'ValeteEspadas':
        return (
          <DivCard id={card} style={{ backgroundColor: 'black' }}>
            <ValeteEspadas></ValeteEspadas>
          </DivCard>
        );
      case 'ValeteCopas':
        return (
          <DivCard  id={card} >
            <ValeteCopas></ValeteCopas>
          </DivCard>
        );
      case 'ValeteOuros':
        return (
          <DivCard  id={card} name={card} >
            <ValeteOuros></ValeteOuros>
          </DivCard>
        );
      case 'ValetePaus':
        return (
          <DivCard  id={card} style={{ backgroundColor: 'black' }}>
            <ValetePaus></ValetePaus>
          </DivCard>
        );
      case 'Zap':
        return (
          <DivCard  id={card} style={{ backgroundColor: 'white' }}>
            <Zap></Zap>
          </DivCard>
        );
      case 'Coringa':
        return (
          <DivCard id={card} style={{ backgroundColor: 'white' }}>
            <Coringa></Coringa>
          </DivCard>
        );
      case 'SeteCopas':
        return (
          <DivCard id={card} style={{ backgroundColor: 'white' }}>
            <SeteCopas></SeteCopas>
          </DivCard>
        );
        case 'SeteOuros':
        return (
          <DivCard  id={card} style={{ backgroundColor: 'white' }}>
            <SeteOuros></SeteOuros>
          </DivCard>
        );
      default:
        return null;
    }
  }

  export default GetCardPlayed