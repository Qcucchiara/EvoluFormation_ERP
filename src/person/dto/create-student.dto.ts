import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createStudentDto {
  @IsString()
  @IsNotEmpty()
  civility: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  type: string;
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  street: string;
  @IsString()
  @IsOptional()
  postal_code: string;
  @IsString()
  @IsOptional()
  commentary: string;
}
