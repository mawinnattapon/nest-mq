import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserCommand } from '../microservices/user/user.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserCommand.CREATE)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern(UserCommand.FIND_ALL)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(UserCommand.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern(UserCommand.UPDATE)
  update(@Payload() data: { id: number, updateUserDto: UpdateUserDto }) {
    return this.userService.update(data.id, data.updateUserDto);
  }

  @MessagePattern(UserCommand.REMOVE)
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
}
