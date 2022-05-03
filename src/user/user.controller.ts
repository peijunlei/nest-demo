import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { RoleType } from 'src/common/constants/role-type';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {

  constructor(private userService: UserService) { }
  @Roles([RoleType.ADMIN])
  @Post()
  create(@Body() createdUserDto: CreateUserDto) {
    return this.userService.create(createdUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto)
  }
  @Patch(":id")
  @Roles([RoleType.ADMIN])
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }
  @Roles([RoleType.ADMIN])
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.userService.remove(id)
  }
  
  @Roles([RoleType.ADMIN])
  @Get()
  findAll() {
    return this.userService.findAll();
  }

}