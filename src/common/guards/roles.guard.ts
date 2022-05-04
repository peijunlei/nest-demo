import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/entities/user.entity';
import { ROLES, RoleType } from '../constants/role-type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<RoleType[]>(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles && roles.length === 0) {
      return true;
    }
   
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    return user.role && roles.includes(user.role);
  }
}