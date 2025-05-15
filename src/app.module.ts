import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';

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
      synchronize: true, // ใช้เฉพาะตอน development เท่านั้น
    }),
    UserModule,
    ApiGatewayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
