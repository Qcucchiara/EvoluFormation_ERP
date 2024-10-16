import { ProspectType } from "@prisma/client";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class updateProspectDto {
  @IsString()
  @IsOptional()
  civility: string;

  @IsString()
  @IsOptional()
  status: string;

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

  @IsString()
  @IsOptional()
  type: ProspectType;

  @IsString()
  @IsOptional()
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
