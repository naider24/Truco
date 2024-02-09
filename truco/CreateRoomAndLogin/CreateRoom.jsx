import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const CreateRoom = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(''); 
  const roomId = uuidv4();
  const handleSubmit = () => {
    
    if (name) {

      const idv4 = uuidv4(); 
      handleCriarSala(idv4);
      const usuario = { 
        idv4,
        name: name,
        team:null,
        cards:[], 
        winner:true, 
        position:'', 
        yourTurn:false, 
        roundInProgress:false, 
        creator:true, 
        room:roomId,
        trucoInProgress:''};
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario)); // Armazene o usuário no localStorage
      
    } else {
      alert('Por favor, insira um nome válido.');
    }
  };

  const handleCriarSala = async(userId) => {
 
    
    try {
      const data = await axios.post("http://localhost:3000/api/rooms", {
        roomId: roomId,
        idUser:userId,
        creator:name,
      });

      if (data) {
        navigate(`/room/${roomId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
   
  

  return (
    <>
      <div>
        <h1>Criar Sala</h1>
        <label>Nome de Usuário:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSubmit}>Criar Sala</button>
      </div>

    </>

  );
};

export default CreateRoom