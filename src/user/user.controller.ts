import {
  Controller,
  Inject,
  Get,
  Body,
  Put,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}

  @Get('/id/:id')
  async me(@Param('id') id: string) {
    return this.client.send<any>('findUser', id);
  }

  @Get('/all')
  async getAll() {
    return this.client.send<any>('getAll', {});
  }

  @Post('/contact')
  async createContact(@Body() data: any, @Req() req) {
    data.user_id = req.userId;
    return this.client.send<any>('createContact', data);
  }

  @Put('/update')
  async updateUser(@Body() data: any, @Req() req) {
    data.id = req.userId;
    return this.client.send<any>('updateUser', data);
  }
}
