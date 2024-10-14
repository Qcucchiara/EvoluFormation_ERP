import { RoleName } from "@prisma/client";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateRoleDto {
  @IsNotEmpty()
  name: RoleName;
  @IsNotEmpty()
  quality: string;
}
