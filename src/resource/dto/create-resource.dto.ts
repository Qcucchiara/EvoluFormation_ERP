import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type_id: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  adress: string

  @IsOptional()
  @IsString()
  postal_code: string

  @IsOptional()
  @IsString()
  city: string

  // TODO: passer le IsDate() en IsISO9601 si possible
  @IsOptional()
  @IsDate()
  acquisition_date: string
}
