import { Controller, Inject, Get, Body, Patch, Param, Query, Post, Req, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('event')
export class EventController {
  constructor(@Inject('EVENT_SERVICE') private readonly eventClient: ClientProxy) { }

  @Post()
  async createEvent(@Body() data, @Req() req) {
    data.owner = req.userId;
    console.log(data)
    return this.eventClient.send<any>('createEvent', data);
  }

  @Post('detail')
  async createDetail(@Body() data) {
    return this.eventClient.send<any>('createDetail', data);
  }

  @Post('image')
  async createImage(@Body() data) {
    return this.eventClient.send<any>('createImage', data);
  }

  @Post('contact')
  async createContact(@Body() data) {
    return this.eventClient.send<any>('createContact', data);
  }

  @Post('findByFilter')
  async findByFIlter(@Body() data) {
    return this.eventClient.send<any>('findEventByFilter', data);
  }

  @Put('publishStatus')
  async changePublishStatus(@Body() data) {
    console.log(data)
    return this.eventClient.send<any>('changePublishStatus', data);
  }

  @Put()
  async updateEvent(@Body() data) {
    return this.eventClient.send<any>('updateEvent', data);
  }

  @Get()
  async getEvents(@Query('from') from: number = 0, @Query('size') size: number = 10) {
    return this.eventClient.send<any>('findAllEvent', { from, size });
  }

  @Get('/myEvents')
  async getMyEvents(@Req() req) {
    return this.eventClient.send<any>('selectEventOfUser', req.userId);
  }


  @Get(':id')
  async createTag(@Param('id') id: string) {
    return this.eventClient.send<any>('findOneEvent', id);
  }

}
