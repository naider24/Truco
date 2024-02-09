import styled from "styled-components";


export const DivTable = styled.div`
position: relative;
width: 100vw;
height: 100vh;
background-color:#121212;
overflow: hidden;

`
export const CardsInhandDown = styled.div`
left: 50%;
top: 89%;
transform: translate(-50%, -50%);
display: flex;
position: absolute;
justify-content: space-between;
align-items: center;

height: 178px;

`

export const CardsInhandTop = styled.div`
top: 10%;
left: 50%;
transform: translate(-50%, -50%);
display: flex;
position: absolute;
justify-content: space-between;
align-items: center;
height: 178px;


`
export const CardsInhandLeft = styled.div`
left: 5%;
top: 40%;
display: flex;
position: absolute;
justify-content: space-between;
align-items: center;

height: 178px;
transform: rotate(-90deg) translate(0, -100%);
`

export const CardsInhandRight = styled.div`
left: 92%;
top: 42%;
transform: translate(-50%, -50%);
display: flex;
position: absolute;
justify-content: space-between;
align-items: center;

height: 178px;
transform: rotate(-90deg) translate(0, -100%);
`

export const CardInTableDown = styled.div`
left: 50%;
top: 70%;
border: 2px solid white;
transform: translate(-50%, -50%);
display: flex;
position: absolute;
border-radius: 15px;
margin-left: 5px;
width: 130px;
height: 175px;

cursor: pointer;
&:hover{
    width: 140px;
    height: 185px;
}

`
export const CardInTableTop = styled.div`
left: 50%;
top:00%;
border: 2px solid white;
transform: translate(-50%, 0%);
display: flex;
position: absolute;
border-radius: 15px;
margin-left: 5px;
width: 130px;
height: 175px;

cursor: pointer;
&:hover{
    width: 140px;
    height: 185px;
}

`
export const CardInTableRight = styled.div`
border: 2px solid white;
left: 100%;
top:30%;
transform: translate(-50%, 0%);
display: flex;
position: absolute;
border-radius: 15px;
margin-left: 5px;
width: 130px;
height: 175px;
transform: rotate(-90deg) translate(0, -100%);
cursor: pointer;
&:hover{
    width: 140px;
    height: 185px;
}

`
export const CardInTableLeft = styled.div`
left: -15%;
top: 30%;
border: 2px solid white;

display: flex;
position: absolute;
border-radius: 15px;
margin-left: 5px;
width: 130px;
height: 175px;
transform: rotate(-270deg) translate(0, -100%);

cursor: pointer;
&:hover{
    width: 140px;
    height: 185px;
}

`

export const CardsPlayed= styled.div`
top: -6%;
left: 50%;
transform: translate(-50%, 50%);

width:70%;
height: 550px;
position: absolute;


`

export const DivPoints= styled.div`
display: flex;
left: 82%;
top: 2%;
position: absolute;
width: 300px;
height: 150px;
background-color: #121212;
border: 2px solid white;
flex-wrap: wrap;

padding: 10px;
`

export const TitlePoints = styled.div`
font-family: Arial, Helvetica, sans-serif;
width: 100%;
border-block-end: 1px solid white;
text-align: center;
color: white;
font-size: 14px;
font-weight: bold;
padding-block-end:10px;

`

export const Points = styled.div`
display: flex;
font-family: Arial, Helvetica, sans-serif;
width: 50%;
font-size: 25px;
font-weight: bold;
height: 70%;
color: white;
justify-content: center;
align-items: center;

`
export const Team = styled.div`
width: 50%;
height: 15%;
text-align: center;
padding-top: 10px;
color: white;
font-size: 14px;
color: white;
font-family: Arial, Helvetica, sans-serif;

`

export const RoundValue = styled.div`
position: absolute;

top:94%;
left:22%;
color: white;
font-weight: bold;
font-family: Arial;
font-size: 18px;
padding: 5px;
border: 1px solid white;
`