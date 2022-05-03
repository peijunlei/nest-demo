import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { RoleType } from "src/common/constants/role-type";
import { LoginUserDto } from "./login-user.dto";


export class CreateUserDto extends LoginUserDto {
  @IsString()
  name: string;

  @ApiPropertyOptional({ enum: RoleType })
  @IsEnum(RoleType)
  @IsOptional()
  role?: RoleType;
}