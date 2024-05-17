import { Controller, Inject, Get, Body, Post, Req, ForbiddenException } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { ClientProxy } from '@nestjs/microservices';
import { Context, Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';

export interface AccessTokenPayload {
  userId: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly redisService: RedisService,
  ) { }

  @Post('/register')
  async register(@Body() data) {
    return this.client.send<any>('register', data);
  }

  @Get('/me')
  async me(@Req() req) {
    return this.client.send<any>('getMe', req.userId);
  }

  @Post('/sendCode')
  async sendCode(@Body() data) {
    const code = await this.client.send<any>('sendCode', data).toPromise();
    let type;
    let inputValue;
    if (data.email) {
      type = "почту " + data.email
      inputValue = data.email
    }
    if (data.phone) {
      type = "номер " + data.phone
      inputValue = data.phone
    }
    const msg = "На " + type + " был отправлен код: " + code;
    await this.bot.telegram.sendMessage('-4231319794', msg);
    console.log(code, inputValue)
    this.redisService.setCode(inputValue, code)
    return 'Код отправлен'
  }


  @Post('/login')
  async login(@Body() data) {
    let code;
    if (data.email) {
      code = await this.redisService.get(data.email)
    }
    if (data.phone) {
      code = await this.redisService.get(data.phone)
    }
    if (data.code.toString() === code) {
      return this.client.send<any>('login', data);
    }
    else throw new ForbiddenException('Invalid code')
  }

  @Post('/restore')
  async restore(@Body() data) {
    let code;
    if (data.email) {
      code = await this.redisService.get(data.email)
    }
    if (data.phone) {
      code = await this.redisService.get(data.phone)
    }
    if (data.code.toString() === code) {
      return this.client.send<any>('restore', data);
    }
    else throw new ForbiddenException('Invalid code')
  }



}
