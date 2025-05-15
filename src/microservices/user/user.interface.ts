// ไฟล์นี้เก็บ interface ที่ใช้ในการสื่อสารระหว่าง service

import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UpdateUserDto } from '../../user/dto/update-user.dto';
import { User } from '../../user/entities/user.entity';

export interface UserServiceInterface {
  create(createUserDto: CreateUserDto): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<User>;
  remove(id: number): Promise<void>;
}

// กำหนดชื่อ pattern สำหรับการสื่อสาร
export const USER_SERVICE = 'USER_SERVICE';

// กำหนดชื่อ command ต่างๆ
export enum UserCommand {
  CREATE = 'create_user',
  FIND_ALL = 'find_all_users',
  FIND_ONE = 'find_one_user',
  UPDATE = 'update_user',
  REMOVE = 'remove_user',
}
