import socketClient from 'socket.io-client';

class SocketService {
    constructor() {
        const SERVER = "http://127.0.0.1:8080";
        this.socket = socketClient(SERVER, {
            transports: ['websocket'],
            extraHeaders: {
                "Bypass-Tunnel-Reminder": true,
                "ngrok-skip-browser-warning": true
            }
        });

        this.setupConnection();
    }

    setupConnection() {
        this.socket.on('connect', () => {
            console.log('Conexão estabelecida com sucesso.');
        });

        this.socket.on('disconnect', () => {
            console.log('Conexão encerrada.');
        });

        this.socket.on('error', (error) => {
            console.error('Erro na conexão:', error);
        });
    }

    addUser(user, roomId) {
        this.socket.emit("subscribe", { roomId, ...user });
    }

    getSocket() {
        return this.socket;
    }
}

export default new SocketService();