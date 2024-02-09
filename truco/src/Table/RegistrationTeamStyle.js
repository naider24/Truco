import styled from 'styled-components'


export const DivOptions = styled.div`
display: flex;
flex-direction: column;
top: 50%;
left: 50%;
transform: translate(-50%,-50% );
display: flex;
padding: 20px;
background-color: white;
position: absolute;
border-radius:20px;
position: absolute;
justify-content: center;
align-items: center;
z-index: 2;
font-family: Arial, Helvetica, sans-serif;

`

export const ButtonConfirm= styled.button`
padding: 20px;
background-color: green;
font-weight: bold;
border-radius: 10px;
color: white;
cursor: pointer;
`
export const ButtonTeam = styled.button`

padding: 10px;
font-size: 14px;
width: 200px;
margin-block-end: 10px;
font-weight: bold;
background-color: red;
color: white;
border-radius: 10px;
cursor: pointer;
`
export const Aviso = styled.h2`

width: 100%;
text-align: center;

`