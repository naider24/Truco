import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { useParams } from "react-router-dom";
const CriarSala = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(''); 
  const {id} = useParams();


  const getRandomColor = () => {

    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
   return color
};

  const handleSubmit = () => {
    
    if (name) {
      const idv4 = uuidv4(); 
      const color = getRandomColor()
      const usuario = { 
        idv4, 
        name: name ,
        color:color, 
        team:null , 
        cards:[],
        winner:false,
        position:'',
        yourTurn:false, 
        roundInProgress:false, 
        creator:false ,
        room:id,
        trucoInProgress:''};
      
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario)); 
      handleLogin(idv4);
    } else {
      alert('Por favor, insira um nome válido.');
    }
  };

  const handleLogin = async (userId) => {
    try {
      const data = await axios.post("http://localhost:3000/api/rooms", {
        roomId: id,
        idUser:userId,
    
      });

      if (data) {
        navigate(`/room/${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  
  };



  return (
    <>
      <div>
        <h1>Entrar na sala</h1>
        <label>Nome de Usuário:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSubmit}>Login</button>
      </div>

    </>

  );
};

export default CriarSala