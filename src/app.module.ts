import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { UserController } from './user/user.controller';
import { CityModule } from './city/city.module';
import { TagController } from './tag/tag.controller';
import { EventController } from './event/event.controller';
import { CategoryController } from './category/category.controller';
import { RedisService } from './redis/redis.service';
import { UploadController } from './fileUpload/upload.controller';
import { GatewayModule } from './gateway/gateway.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '7152324180:AAG1K1oTPh-GJdwwwQv_Iti7Ure3X3od-yc',
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://newuser:newpassword@127.0.0.1:5672'],
          queue: 'users_queue',
        },
      },
      {
        name: 'EVENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://newuser:newpassword@127.0.0.1:5672'],
          queue: 'events_queue',
        },
      },
    ]),
    CityModule,
    GatewayModule,
  ],
  controllers: [
    AuthController,
    UserController,
    TagController,
    EventController,
    CategoryController,
    UploadController,
  ],
  providers: [RedisService, AppGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
