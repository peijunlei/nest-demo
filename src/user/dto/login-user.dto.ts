import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {

  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}