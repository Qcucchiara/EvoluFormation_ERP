import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateRoleDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  quality: string;
}
