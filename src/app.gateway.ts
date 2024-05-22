import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketService } from './gateway/gateway.service';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private socketService: SocketService) {}

  @WebSocketServer() public server: Server;
  private logger: Logger = new Logger('AppGateway');

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  afterInit(server: Server) {
    this.socketService.socket = server;
    const users = [];

    this.socketService.socket.on('connection', (socket) => {
      socket.on('join', function (data) {
        socket.join(data.userId);
        users.push(data.userId);
      });

      socket.on('message', function (data) {
        console.log(data);
        console.log(users);
        socket.in(data.opponentId).emit('message', data.message);
      });
    });
  }
}
