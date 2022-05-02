import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm'
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>
  ) { }

  findAll(paginationQuery: PaginationQueryDto) {
    const { pageNum, pageSize } = paginationQuery//分页
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: pageNum,
      take: pageSize
    });
  }
  async findOne(id: number) {

    const coffee = await this.coffeeRepository.findOne({ where: { id: id }, relations: ['flavors'] });
    if (!coffee) throw new NotFoundException(`coffee #${id} not found`)
    return coffee
  }
  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(v => this.preloadFlavorByName(v))
    )
    const coffee = this.coffeeRepository.create({ ...createCoffeeDto, flavors })

    return this.coffeeRepository.save(coffee)
  }
  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = updateCoffeeDto.flavors && await Promise.all(
      updateCoffeeDto.flavors.map(v => this.preloadFlavorByName(v))
    )
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors
    })
    if (!coffee) throw new NotFoundException(`coffee #${id} not found`)
    return this.coffeeRepository.save(coffee)
  }
  async remove(id: number) {
    const coffee = await this.coffeeRepository.findOneBy({ id });
    if (!coffee) throw new NotFoundException(`coffee #${id} not found`)
    return this.coffeeRepository.remove(coffee)
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ where: { name } })
    if (existingFlavor) return existingFlavor
    return this.flavorRepository.create({ name })
  }

  async findAllFlavors() {
    const allFlavors = await this.flavorRepository.find()
    return allFlavors
  }

}
