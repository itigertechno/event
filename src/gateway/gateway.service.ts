import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  public socket: Server = null;
  sendMessageToUser(userId: string, event: string, message: any) {
    if (this.socket) {
      this.socket.to(userId).emit(event, message);
    }
  }
}
