import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUser } from './user-interface';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService
  ) { }

  async create(createdUserDto: CreateUserDto) {
    const userEntity = this.userRepository.create(createdUserDto)
    const isEmailExists = await this.isEmailExists(userEntity.email)
    if (isEmailExists) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }
    userEntity.password = this.authService.hashPassword(userEntity.password);
    const savedUser = await this.userRepository.save(userEntity)
    const { password, ...user } = savedUser
    return user
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.findUserByEmail(loginUserDto.email)
    console.log(user);

    if (user) {
      const isMatch = this.validatePassword(loginUserDto.password, user.password)
      if (isMatch) {
        return {
          token: this.authService.generateJwt(user)
        }
      } else {
        throw new HttpException('password is not matched', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return this.userRepository.findOne({ id })
  }
  async remove(id: number) {
    const user = await this.userRepository.findOne(id)
    if (user) {
      return this.userRepository.remove(user)
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      const _user = await this.findUserByEmail(updateUserDto.email)
      if (_user && _user.id !== id) {
        throw new HttpException('Email already in use', HttpStatus.CONFLICT);
      }
    }
    if (updateUserDto.password) {
      updateUserDto.password = this.authService.hashPassword(updateUserDto.password)
    }
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    })
    if (!user) throw new NotFoundException(`user'id is ${id} not found`)
    const { password, ...finaluser } = await this.userRepository.save(user)
    return finaluser
  }

  private findUserByEmail(email: string) {
    email = email.toLowerCase();
    return this.userRepository.findOne({ email }, { select: ['id', "email", "password", "name", "role"] });
  }

  private validatePassword(password: string, storedPasswordHash: string) {
    return this.authService.comparePasswords(password, storedPasswordHash);
  }

  private async isEmailExists(email: string) {
    email = email.toLowerCase();
    const [_, count] = await this.userRepository.findAndCount({ email })
    return count !== 0
  }

}