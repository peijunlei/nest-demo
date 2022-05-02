import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeeService {
  private _coffees: Coffee[] = [
    {
      id: 1,
      name: '拿铁',
      brand: "星巴克",
      flavors: ['抹茶']
    }
  ]
  findAll() {
    return this._coffees
  }
  findOne(id: string) {
    // throw 'some error'
    const coffee = this._coffees.find(v => v.id === +id)
    // if (!coffee) throw new HttpException(`coffee #${id} not found`, HttpStatus.NOT_FOUND)
    if (!coffee) throw new NotFoundException(`coffee #${id} not found`)

    return coffee
  }
}
