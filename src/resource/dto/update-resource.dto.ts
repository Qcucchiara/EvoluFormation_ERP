import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateResourceDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  adress: string;

  @IsOptional()
  @IsString()
  postal_code: string;

  @IsOptional()
  @IsString()
  ciy: string;

  @IsOptional()
  @IsDate()
  acquisition_date: string;
}
