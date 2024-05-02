var app = require('express')();
var http = require('http').createServer(app);
var path = require('path')
const fs = require('fs');
const os = require('os');



const PORT = 8080;
var io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Bypass-Tunnel-Reminder"],
  }
});

let connections = {};
let cardsDistributed = false;
let winningTurn = false
let winningRound = false

io.on('connection', (socket) => {

  socket.enabled = true

  socket.on('subscribe', (user) => {
    if (user) {
      socket.join(user.roomId);
      connections[socket.id] = user;
      const message = `Novo usuário: ${user.name} entrou na sala ${user.roomId}`;
      io.to(user.roomId).emit('new user', { id: user.id, name: user.name, color: user.color });
   
    }
  });


  
  socket.on('join', (message) => {
    const username = message.username;
    const room = message.room;
    socket.join(room);

    socket.to(room).emit('ready', { username, socketId: socket.id });
  });

  socket.on('disconnect', () => {
    const connection = connections[socket.id];
    if (connection) {
      const message = `${connection.name} saiu da sala ${connection.roomId}`;
      delete connections[socket.id];
   
      io.to(connection.roomId).emit('user left', { message,name:connection.name, userId: connection.id });
    }
  });

  socket.on('dealCards', ({ roomId, distributedCards}) => {
    if (!cardsDistributed) {
      const startingIndex = Math.floor(Math.random() * distributedCards.length);
      const startingPosition = distributedCards[startingIndex].position;

      io.in(roomId).emit('distributeCards', { startingPosition, distributedCards });
      cardsDistributed = true; 
    }
  });

  socket.on('playedCards',({roomId, newCard})=>{
 
   
    io.in(roomId).emit('playedCard',{newCard});
    cardsDistributed = false;
    winningTurn = false
    winningRound = false
  })

  socket.on('turns',({roomId,position})=>{

  
    io.in(roomId).emit('turn',position);

  })

  socket.on('winningTurn',({roomId,playerData})=>{

   if(!winningTurn){
    io.in(roomId).emit('winningTurns',{playerData});
    winningTurn = true
   }
   
  })

  socket.on('winningRound',({roomId, teamWinner, position,id, msg})=>{
 
    if(!winningRound){
      io.in(roomId).emit('winningRounds',{teamWinner, position, id,msg });
      winningRound= true
    }
    
  })

  socket.on('truco',({roomId,nextPosition})=>{

   console.log(nextPosition)
   console.log(roomId)
    io.in(roomId).emit('Truco',nextPosition);
  })

  socket.on('rejectTruco',({roomId,team, usuarioLogado})=>{
    console.log(usuarioLogado)
    io.in(roomId).emit('RejectTruco',team,usuarioLogado);
  })

  socket.on('acceptTruco',({roomId})=>{
    io.in(roomId).emit('AcceptTruco');
  })
});

http.listen(PORT, () => console.log(`O SERVIDOR ESTA RODANDO NA PORTA ${PORT}`));