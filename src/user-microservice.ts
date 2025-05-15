import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { USER_SERVICE } from './microservices/user/user.interface';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

// สร้าง Module เฉพาะสำหรับ Microservice
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestuser',
      password: 'nestpassword',
      database: 'nestjs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule
  ],
})
class UserMicroserviceModule {}

async function bootstrap() {
  const logger = new Logger('UserMicroservice');
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserMicroserviceModule,
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
