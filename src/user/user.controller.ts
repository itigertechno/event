import { Controller, Inject, Get, Body, Patch, Param, Delete, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) { }

  @Get(':id')
  async me(@Param('id') id: string) {
    return this.client.send<any>('findUser', id);
  }

  @Post('/contact')
  async createContact(@Body() data: any, @Req() req) {
    data.user_id = req.userId;
    return this.client.send<any>('createContact', data);
  }

}
