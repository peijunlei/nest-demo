import { applyDecorators, SetMetadata, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ROLES, RoleType } from "../constants/role-type";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";


export function Roles(roles: RoleType[]) {
  return applyDecorators(
    SetMetadata(ROLES, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}

