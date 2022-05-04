import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { jwtConstants } from 'src/auth/constants';
import { RoleType } from 'src/common/constants/role-type';
import { Roles } from 'src/common/decorators/roles.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
// @Roles([RoleType.USER])
@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) { }

  @Get()
  // @Roles([RoleType.ADMIN])
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQuery)
  }
  @Post(":id")
  findOne(@Param("id") id: number) {
    return this.coffeeService.findOne(id)
  }
  @Get("/flavor")
  findAllFlavors() {
    return this.coffeeService.findAllFlavors()
  }
  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto)
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.update(id, updateCoffeeDto)
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.coffeeService.remove(id)
  }
}
