import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { USER_SERVICE, UserCommand } from '../microservices/user/user.interface';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return firstValueFrom(
      this.userServiceClient.send(UserCommand.CREATE, createUserDto)
    );
  }

  @Get()
  async findAll() {
    return firstValueFrom(
      this.userServiceClient.send(UserCommand.FIND_ALL, {})
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return firstValueFrom(
      this.userServiceClient.send(UserCommand.FIND_ONE, +id)
    );
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return firstValueFrom(
      this.userServiceClient.send(UserCommand.UPDATE, { id: +id, updateUserDto })
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return firstValueFrom(
      this.userServiceClient.send(UserCommand.REMOVE, +id)
    );
  }
}
