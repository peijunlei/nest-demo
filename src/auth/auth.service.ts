import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { IUser } from 'src/user/user-interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) { }
  /**
   * 
   * @param user 
   * @returns 
   */
  generateJwt(user: IUser) {
    return this.jwtService.sign({user})
  }
  /**
   * 
   * @param password 
   * @returns 
   */
  hashPassword(password: string) {
    return bcrypt.hashSync(password, 12)
  }
  /**
   * 
   * @param password 
   * @param storedPasswordHash 
   * @returns 
   */
  comparePasswords(password: string, storedPasswordHash: string) {
    return bcrypt.compareSync(password, storedPasswordHash)
  }
}