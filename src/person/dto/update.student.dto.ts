import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class updateStudentDto {
  // peut être pas nécessaire
  // @IsString()
  // @IsNotEmpty()
  // civility: string;

  @IsString()
  @IsOptional()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  // c'est un étudiant donc pas besoin
  // @IsString()
  // @IsOptional()
  // type: string;

  @IsString()
  @IsOptional()
  company: string;

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
