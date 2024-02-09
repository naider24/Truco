import { CloseAlert, DivMain, TextAlert } from "./AlertsStyle"
import socketService from "../../service/socketService"
import axios from "axios"
function AlertTruco({ roomId, valueRound, setShowAlert, setAnswerAwaiting, fetchRoomdata, }) {
    const socket = socketService.getSocket()



    const acceptTruco = async () => {

        console.log(`valor do round em accept ${valueRound}`)
        if (valueRound === 1) {
            const response = await axios.get(`http://localhost:3000/api/rooms?roomId=${roomId}`);
            const data = response.data;
            const updatedValueRound = Number(data.currentRound.Round[0].roundValue) + 2;

            axios.put(`http://localhost:3000/api/rooms/${roomId}/points`, {

                value: updatedValueRound
            })
                .then((response) => {
                    console.log('valor do round atualizado com sucesso', response.data);

                    socket.emit('acceptTruco', { roomId })
                    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
                    usuarioLogado.trucoInProgress = ''
                    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))




                })
                .catch((error) => {
                    console.error('Erro ao resetar rounds:', error);
                });

        } else {
            const response = await axios.get(`http://localhost:3000/api/rooms?roomId=${roomId}`);
            const data = response.data;
            const updatedValueRound = Number(data.currentRound.Round[0].roundValue) + 3;

            axios.put(`http://localhost:3000/api/rooms/${roomId}/points`, {

                value: updatedValueRound
            })
                .then((response) => {
                    console.log('valor do round atualizado com sucesso', response.data);

                    console.log(updatedValueRound)
                    socket.emit('acceptTruco', { roomId })
                    let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
                    usuarioLogado.trucoInProgress = ''
                    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado))

                })
                .catch((error) => {
                    console.error('Erro ao resetar rounds:', error);
                });
        }




    }
    function rejectTruco() {
        let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        socket.emit('rejectTruco', { roomId, team: usuarioLogado.team, usuarioLogado: usuarioLogado })
        setShowAlert(false)

    }
    return (<>
        <DivMain>
            <TextAlert>O TIME ADVERSÁRIO PEDIU TRUCO , VOCÊ VAI ACEITAR ?</TextAlert>
            <div style={{ display: 'flex', justifyContent: "space-between", width: '100%' }}>
                <CloseAlert onClick={acceptTruco}>ACEITAR</CloseAlert>
                <CloseAlert onClick={rejectTruco}>RECUSAR</CloseAlert></div>

        </DivMain>

    </>)
}

export default AlertTruco