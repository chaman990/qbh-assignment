import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './models/dto';

@Injectable()
export class UserService {
  private users = [];

  async create(createUserDto: CreateUserDto) {
    const newUser = { id: Date.now().toString(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  async findAll() {
    return this.users;
  }

  async findOne(id: string) {
    return this.users.find(user => user.id === id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...updateUserDto };
    return this.users[index];
  }

  async remove(id: string) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;
    const deletedUser = this.users[index];
    this.users.splice(index, 1);
    return deletedUser;
  }
}