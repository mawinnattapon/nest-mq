import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from './microservices/user/user.interface';

async function bootstrap() {
  const logger = new Logger('Main');
  
  // สร้าง API Gateway
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // ลบ property ที่ไม่ได้กำหนดใน DTO
    transform: true, // แปลงข้อมูลให้ตรงกับ type ใน DTO
    forbidNonWhitelisted: true, // ไม่อนุญาตให้มี property ที่ไม่ได้กำหนดใน DTO
  }));
  
  // เชื่อมต่อ User Microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:admin@localhost:5672'],
      queue: USER_SERVICE,
      queueOptions: {
        durable: true,
      },
    },
  });
  
  // เริ่มทำงาน Microservices
  await app.startAllMicroservices();
  
  // เริ่มทำงาน API Gateway
  await app.listen(process.env.PORT ?? 3000);
  
  logger.log(`API Gateway is running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
