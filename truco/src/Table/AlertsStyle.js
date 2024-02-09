

import styled from 'styled-components'


export const DivMain =styled.div`
left: 50%;
top:50%;
position: absolute;
width: 500px;
display: flex;
flex-direction: column;
padding: 20px;
align-items: center;
z-index:3;
background-color: #121212;
border: 2px solid white;
transform: translate(-50%, -50%);


`
export const CloseAlert= styled.button`
font-family: Arial, Helvetica, sans-serif;
border: none;
border: 2px solid white;
padding: 20px;
border-radius: 5px;
color: white;
cursor: pointer;
background-color: #121212;
width: 200px;
`

export const TextAlert = styled.div`
display: flex;
width: 100%;
font-size: 12px;
height: 200px;
justify-content: center;
color: white;
font-family: Arial, Helvetica, sans-serif;
`

export const TeamWinner = styled.div`
display: flex;
font-weight: bold;
position: absolute;
top :22%;
font-size: 16px;
justify-content: center;
color: white;
font-family: Arial, Helvetica, sans-serif;
left: 50%;
transform: translate(-50%, -50%);
`
export const Overlay = styled.div`

position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 9999; 
    pointer-events: auto; 

`