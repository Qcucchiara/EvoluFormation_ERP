import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumberString()
  siret: string;

  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  @IsNumberString()
  postal_code: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsUrl()
  website_link: string;
}
