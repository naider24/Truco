const { Room: RoomModel } = require("../models/Room");
const { ObjectId } = require('mongodb');



const roomController = {



  getAll: async (req, res) => {

    try {
      const { roomId } = req.query; // Recebe o roomId enviado do frontend



      if (roomId) {
        const room = await RoomModel.findOne({ roomId: roomId });


        if (!room) {

          return res.status(404).json({ error: 'Sala não encontrada' });
        }

        return res.json(room);
      }

      const response = await RoomModel.find();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao buscar as salas' });
    }
  },

  create: async (req, res) => {
    const { roomId, idUser, team, name } = req.body;



    try {
      const room = await RoomModel.findOne({ roomId: roomId });

      if (!room) {
        const newRoom = {
          roomId,
          creator: req.body.creator,
          users: [idUser],
          points: {
            TeamOne: [{
              points: 0,
              turnsWin: 0
            }],
            
            TeamTwo: [{ points: 0, roundsWin: 0 }],
          },
          teams: {
            TeamOne: [
              { position: 'top', player: 'não selecionado', name: '' },
              { position: 'down', player: 'não selecionado', name: '' },
            ],
            TeamTwo: [
              { position: 'left', player: 'não selecionado', name: '' },
              { position: 'right', player: 'não selecionado', name: '' },
            ],
          },
          currentRound: {

            cardsDealt: [
              { player: '', cards: [] },
              { player: '', cards: [] },
              { player: '', cards: [] },
              { player: '', cards: [] },

            ],
            Round: [
              { roundInProgress: false, roundValue: 1, roundFinished: false }
            ]
          }
        };

        const response = await RoomModel.create(newRoom);
        return res.status(201).json({ response, msg: 'Room created!!' });
      }

      if (team === 'TeamOne' && (room.teams.TeamOne.every(player => player.player !== 'não selecionado'))) {
        return res.status(400).json({ error: 'Time está cheio' });
      }

      if (team === 'TeamTwo' && (room.teams.TeamTwo.every(player => player.player !== 'não selecionado'))) {
        return res.status(400).json({ error: 'Time está cheio' });
      }


      if (team === 'TeamOne') {
        const emptySlot = room.teams.TeamOne.find(player => player.player === 'não selecionado');

        if (emptySlot) {
          emptySlot.player = idUser;
          emptySlot.name = name


        } else {
          return res.status(400).json({ error: 'Time está cheio' });
        }
      } else if (team === 'TeamTwo') {
        const emptySlot = room.teams.TeamTwo.find(player => player.player === 'não selecionado');

        if (emptySlot) {
          emptySlot.player = idUser;
          emptySlot.name = name

        } else {
          return res.status(400).json({ error: 'Time está cheio' });
        }
      }

      const userExists = room.users.includes(idUser);

      if (!userExists) {
        console.log('cai aki')
        await RoomModel.updateOne({ roomId }, { $addToSet: { users: idUser } });
        await room.save();
      }






      await room.save();
      return res.status(200).json({ msg: 'User added to team' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error creating room or adding player to team' });
    }
  },
  update: async (req, res) => {
    const { roomId } = req.params;
    const newCard = req.body.newCard;

    try {
      const room = await RoomModel.findOneAndUpdate(
        { roomId },
        {
          $push: {
            'currentRound.cardsPlayed': newCard
          }
        },
        { new: true }
      );

      console.log(newCard);
      res.status(200).json({ room, msg: 'Carta adicionada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao adicionar a carta' });
    }
  },

  clearCardsPlayed: async (req, res) => {
    const { roomId } = req.params;

    try {
      const room = await RoomModel.findOneAndUpdate(
        { roomId },
        { $set: { 'currentRound.cardsPlayed': [] } },
        { new: true }
      );

      console.log('Registros de cardsPlayed limpos com sucesso.', room);
      res.status(200).json({ room, msg: 'Cartas jogadas limpas com sucesso' });
    } catch (error) {
      console.error('Erro ao limpar os registros de cardsPlayed:', error);
      res.status(500).json({ error: 'Erro ao limpar as cartas jogadas' });
    }
  },

  updatePointsAndRoundsWin: async (req, res) => {
    const { roomId } = req.params;
    const { teamOnePoints, teamTwoPoints, teamOneTurnsWin, teamTwoTurnsWin, value } = req.body;

    console.log(`isso é oque eu recebo quando o value é atualizado ${value}`)
    try {
      const room = await RoomModel.findOneAndUpdate(
        { roomId },
        {
          $set: {
            'points.TeamOne.0.points': teamOnePoints,
            'points.TeamTwo.0.points': teamTwoPoints,
            'points.TeamOne.0.turnsWin': teamOneTurnsWin,
            'points.TeamTwo.0.turnsWin': teamTwoTurnsWin,
            'currentRound.Round.0.roundValue': value,
          },
        },
        { new: true }
      );

      res.status(200).json({ room, msg: 'Pontos e rodadas vencidas atualizados com sucesso.' });
      console.log('cai aki')
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar os pontos e rodadas vencidas.' });
    }
  }

}
module.exports = roomController;