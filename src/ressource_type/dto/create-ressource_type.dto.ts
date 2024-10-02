import { IsNotEmpty, IsString } from "class-validator";

export class CreateRessourceTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
