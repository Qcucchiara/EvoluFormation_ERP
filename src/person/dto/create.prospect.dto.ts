import { Type } from "@prisma/client";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
export enum type {
  EMPLOYEE = "Employee",
  JOB_SEEKER = "Job_Seeker",
  BUSINESS_MANAGER = "Business_Manager",
  RH = "RH",
  CADRE = "Cadre",
  TRAINING_MANAGER = "Training_Manager",
}
export class createProspectDto {
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
  type: Type;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  @IsOptional()
  siret: string;

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
