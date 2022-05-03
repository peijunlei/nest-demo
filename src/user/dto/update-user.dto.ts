import { PartialType } from '@nestjs/mapped-types';
import { RoleType } from 'src/common/constants/role-type';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }
