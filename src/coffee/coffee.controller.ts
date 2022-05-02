import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) { }

  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery

    return this.coffeeService.findAll()
  }
  @Get(":id")
  findOne(@Param("id") id:number) {
    console.log('====================================');
    console.log(typeof id);
    console.log('====================================');
    return this.coffeeService.findOne(''+id)
  }
  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log('====================================');
    console.log(createCoffeeDto instanceof CreateCoffeeDto);
    console.log('====================================');
    return createCoffeeDto
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCoffeeDto:UpdateCoffeeDto) {
    return `this is update ${id} coffee`
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return `this is delete ${id} coffee`
  }
}
