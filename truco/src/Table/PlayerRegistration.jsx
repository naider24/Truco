import React, { useEffect, useState } from 'react';
import axios from 'axios';
import socketService from '../../service/socketService';
import { useParams } from 'react-router-dom';
import { Aviso, ButtonConfirm, ButtonTeam, DivOptions } from './RegistrationTeamStyle';

function PlayerRegistration() {
  const [team, setTeam] = useState('');
   const [show, setShow] = useState(false);
  const { id } = useParams();
  const roomId = id;
  let usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
  const [selectedTeamButton, setSelectedTeamButton] = useState('');
 const [leaveTeam, setLeaveTeam]= useState()
 const consultData = async()=>{
  const roomResponse = await axios.get(`http://localhost:3000/api/rooms?roomId=${roomId}`);
  const room = roomResponse.data;


 }
  useEffect(() => {
  
   
    const registerPlayer = async () => {


      socketService.addUser(usuario, roomId);
      if (!usuario) return

      if (usuario.team === null) {
      setShow(true);
       }
      socketService.getSocket().on(`new user`, (message) => {
        if (message.id === usuario.id) {
       
        }
      });

    };

    
      registerPlayer();



    
  }, []);



  const handleRegisterPlayer = async () => {
    try {
      const roomResponse = await axios.get(`http://localhost:3000/api/rooms?roomId=${roomId}`);
      const room = roomResponse.data;

      const selectedTeam = team === 'TeamOne' ? room.teams.TeamOne : room.teams.TeamTwo;
      const checkedId =  selectedTeam.every(player => player.player !== usuario.idv4);

      if (room) {
       
        const isTeamFull = selectedTeam.every(player => player.player !== 'não selecionado');
        if (isTeamFull) {
          alert('Time está cheio');
          
        }

      }
     
    
   if(checkedId){
    const response = await axios.post('http://localhost:3000/api/rooms', {
        roomId: roomId,
        idUser: usuario.idv4,
        team: team,
        name:usuario.name
      });
 
      setShow(false);
     
   }else{
    setLeaveTeam(true)
   alert('voce ja está nesse time')
   }

      
    } catch (error) {
      console.error(error);
    }
   

  };
  const handleLeaveTeam = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/rooms?roomId=${roomId}`);
      const room = response.data;
    
      if (room) {
        const { TeamOne, TeamTwo } = room.teams;
        
    
        const playerIndexTeamOne = TeamOne.findIndex(player => player.player === usuario.idv4);
        if (playerIndexTeamOne !== -1) {
          TeamOne[playerIndexTeamOne].player = 'não selecionado';
          TeamOne[playerIndexTeamOne].name = '';
        }
    

        const playerIndexTeamTwo = TeamTwo.findIndex(player => player.player === usuario.idv4);
        if (playerIndexTeamTwo !== -1) {
          TeamTwo[playerIndexTeamTwo].player = 'não selecionado';
          TeamTwo[playerIndexTeamTwo].name = '';
        }
    
       
        await axios.put(`http://localhost:3000/api/rooms/${roomId}`, room);
        setLeaveTeam(false)
      } 
   
     usuario.team = null
     localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
 
    } catch (error) {
      console.error(error);
    }
  };

  const handleTeamSelection = (selectedTeam) => {
    setTeam(selectedTeam);
    setSelectedTeamButton(selectedTeam); 
   
    usuario.team = selectedTeam;
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    
  };
 function handleMaintainTeam(){
  setShow(false)
 
 }
 consultData()

  return (
    <>
      {show === true ? (
        <DivOptions>
          <Aviso>Escolha um time</Aviso>
          {leaveTeam?
          
         <>
         <ButtonTeam onClick={handleLeaveTeam}>sair do time</ButtonTeam>
         <ButtonTeam style={{backgroundColor:'green'}} onClick={handleMaintainTeam}>se manter no time </ButtonTeam>
         </>:<>
          <ButtonTeam onClick={() => handleTeamSelection('TeamOne')} style={{ backgroundColor: selectedTeamButton === 'TeamOne' ? 'black' : 'white' ,color:selectedTeamButton === 'TeamOne' ? 'white' : 'black'}}>
            Time 1
          </ButtonTeam>
          <ButtonTeam onClick={() => handleTeamSelection('TeamTwo')} style={{ backgroundColor: selectedTeamButton === 'TeamTwo' ? 'black' : 'white' ,color:selectedTeamButton === 'TeamTwo' ? 'white' : 'black'}}>
            Time 2
          </ButtonTeam>
          </> } 
          

          <ButtonConfirm onClick={handleRegisterPlayer}>CONFIRMAR</ButtonConfirm>

        </DivOptions>
      ) : null}
    </>
  );
}

export default PlayerRegistration;
