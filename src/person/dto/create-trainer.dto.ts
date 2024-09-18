import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";

export class commentSectionDTO {
  @IsString()
  @IsOptional()
  commentary: string;

  @IsString()
  @ValidateIf((e) => e.commentary)
  commentaryCategory: string;
}

export class createTrainerDTO {
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
