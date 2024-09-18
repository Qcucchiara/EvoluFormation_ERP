import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  ValidateIf,
} from "class-validator";

export class updateTrainerDTO {
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

  @IsString({ each: true })
  @IsOptional()
  cities_of_activity: string[];

  @IsString({ each: true })
  @IsOptional()
  module_ids: string[];

  @IsString()
  @IsOptional()
  commentary: string;

  @IsString()
  @ValidateIf((e) => e.commentary)
  commentaryCategory: string;
}
