import { AsCopas, AsEspadas, AsOuros, AsPaus, Coringa, DivCard, DoisCopas, DoisEspadas, DoisOuros, DoisPaus, RainhaCopas, RainhaEspadas, RainhaOuros, RainhaPaus, ReiCopas, ReiEspadas, ReiOuros, ReiPaus, SeteCopas, SeteOuros, TresCopas, TresEspadas, TresOuros, TresPaus, ValeteCopas, ValeteEspadas, ValeteOuros, ValetePaus, Zap } from "./cardStyle"



function Cards() {
  

  return (
    <>
    <div style={{ display:"flex",width:'100%', height:'400px',backgroundColor:'pink', flexWrap:'wrap'}}>
    <DivCard>
   <AsCopas></AsCopas>
    </DivCard>
   
    <DivCard>
      <AsOuros></AsOuros>
    </DivCard>
    <DivCard style={{backgroundColor:'black'}}>
      <AsPaus></AsPaus>
    </DivCard>
    <DivCard style={{backgroundColor:'black'}}>
     <RainhaEspadas></RainhaEspadas>
    </DivCard>
    <DivCard>
      <RainhaCopas></RainhaCopas>
    </DivCard>
    <DivCard style={{backgroundColor:'black'}}>
      <RainhaPaus></RainhaPaus>
    </DivCard>
    <DivCard >
      <RainhaOuros></RainhaOuros>
    </DivCard>
    <DivCard style={{backgroundColor:'black'}}>
     <ReiEspadas></ReiEspadas>
    </DivCard>
    <DivCard>
      <ReiCopas></ReiCopas>
    </DivCard>
    <DivCard style={{backgroundColor:'black'}}>
      <ReiPaus></ReiPaus>
    </DivCard>
    <DivCard >
      <ReiOuros></ReiOuros>
    </DivCard>
    <DivCard style={{backgroundColor:'black'}}>
     <ValeteEspadas></ValeteEspadas>
    </DivCard>
    <DivCard>
      <ValeteCopas></ValeteCopas>
    </DivCard>
    <DivCard style={{backgroundColor:'black'}}>
     <ValetePaus></ValetePaus>
    </DivCard>
    <DivCard >
      <ValeteOuros></ValeteOuros>
    </DivCard>
    <DivCard style={{backgroundColor:'black'}}>
     <TresEspadas></TresEspadas>
    </DivCard>
    <DivCard>
      <TresCopas></TresCopas>
    </DivCard>
    <DivCard style={{backgroundColor:'black'}}>
     <TresPaus></TresPaus>
    </DivCard>
    <DivCard >
      <TresOuros></TresOuros>
    </DivCard>

    <DivCard style={{backgroundColor:'black'}}>
     <DoisEspadas></DoisEspadas>
    </DivCard>
    <DivCard>
      <DoisCopas></DoisCopas>
    </DivCard>
    <DivCard style={{backgroundColor:'black'}}>
     <DoisPaus></DoisPaus>
    </DivCard>
    <DivCard >
      <DoisOuros></DoisOuros>
    </DivCard>
    <DivCard style={{backgroundColor:'white'}}>
     <Coringa></Coringa>
    </DivCard>
    <DivCard style={{backgroundColor:'white'}}>
     <SeteOuros></SeteOuros>
    </DivCard>
    <DivCard style={{backgroundColor:'white'}}>
     <AsEspadas></AsEspadas>
     </DivCard>
    <DivCard style={{backgroundColor:'white'}}>
     <SeteCopas></SeteCopas>
    </DivCard>
    <DivCard style={{backgroundColor:'white'}}>
     <Zap></Zap>
     </DivCard>
    
    </div>
  


    </>
  )
}

export default Cards
