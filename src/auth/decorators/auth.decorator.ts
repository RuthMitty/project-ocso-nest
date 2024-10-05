import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";

export const Auth = (...roles: string[]) => {
  roles.push("Admi");
  return applyDecorators(Roles(roles), UseGuards(AuthGuard, RolesGuard));
};
