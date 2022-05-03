import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import { IUser } from 'src/user/user-interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) { }

  generateJwt(user: IUser) {
    return this.jwtService.sign({ user })
  }
  /**加密 */
  hashPassword(password: string) {
    return bcrypt.hashSync(password, 12)
  }
  /**比较 */
  comparePasswords(password: string, storedPasswordHash: string) {
    return bcrypt.compareSync(password, storedPasswordHash)
  }
}