import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createStudentDto {
  // peut être pas nécessaire
  // @IsString()
  // @IsNotEmpty()
  // civility: string;

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

  // c'est un étudiant donc pas besoin
  // @IsString()
  // @IsOptional()
  // type: string;

  // @IsString()
  // @IsNotEmpty()
  // companies: string;

  // je ne vois pas l'utilité
  // @IsString()
  // @IsOptional()
  // city: string;
  // @IsString()
  // @IsOptional()
  // street: string;
  // @IsString()
  // @IsOptional()
  // postal_code: string;
  @IsString()
  @IsOptional()
  commentary: string;
}
