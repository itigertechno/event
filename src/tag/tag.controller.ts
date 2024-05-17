import { Controller, Inject, Get, Body, Patch, Param, Delete, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('tag')
export class TagController {
  constructor(@Inject('EVENT_SERVICE') private readonly eventClient: ClientProxy) { }

  @Get()
  async getTags() {
    return this.eventClient.send<any>('findAllTag', {});
  }

  @Get(':label')
  async getLabelTags(@Param('label') label: string) {
    return this.eventClient.send<any>('findByLabel', label);
  }

  @Post()
  async createTag(@Body() data: any) {
    return this.eventClient.send<any>('createTag', data);
  }

}
