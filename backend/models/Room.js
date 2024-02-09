const mongoose = require("mongoose");

const { Schema } = mongoose;
const roomSchema = new Schema({
    roomId: {
        type: String,
        required: true
    },
    creator: {
        type: String,
    },
    users: {
        type: [Object],
    },
    
    teams: {
        TeamOne: [
          {
            position: String,
            player: { type: String, default: 'não selecionado' },
            name: {type:String, default:''},
          },
        ],
        TeamTwo: [
          {
            position: String,
            player: { type: String, default: 'não selecionado' },
            name: {type:String, default:''},
          },
        ],
      },
  
    points: {
        
        TeamOne: [{
         
         
                points:{ type:Number, default:0},
               turnsWin:{ type:Number, default:0},

        }],
                              
        
        TeamTwo:[{
            points:{ type:Number, default:0},
            turnsWin:{ type:Number, default:0},

        }]
                              
        
    },



    currentRound: {
        

        Round:[{

            roundInProgress:{
                type:Boolean,
                default:false
            },
            roundValue:{
                type: Number,
                default: 1,
            },
            roundFinished:{
                type: Boolean,
                default: false
            },

        }],
        cardsPlayed: [
           
        ],
            
        cardsDealt:[
            {
                player: {
                    type: String,
                    default:null,
                },
                cards: {
                    type: [String], 
                    default: []
                },
                position:{
                    type: String,
                    default:null
                }
            }
        ]
       
    }
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

module.exports = { Room };