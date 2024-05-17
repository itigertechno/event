import { Controller, Inject, Get, Body, Patch, Param, Delete, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('category')
export class CategoryController {
  constructor(@Inject('EVENT_SERVICE') private readonly eventClient: ClientProxy) { }

  @Get()
  async getCategory() {
    return this.eventClient.send<any>('findAllCategory', {});
  }

  @Post()
  async createCategory(@Body() data: any) {
    return this.eventClient.send<any>('createCategory', data);
  }

}
