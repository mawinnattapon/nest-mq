import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { UserModule } from '../../user/user.module';
import { USER_SERVICE } from './user.interface';

async function bootstrap() {
  const logger = new Logger('UserMicroservice');
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: USER_SERVICE,
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  
  await app.listen();
  logger.log('User Microservice is listening');
}

bootstrap();
