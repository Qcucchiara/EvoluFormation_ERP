import { IsString, IsOptional, IsNumberString, IsUrl } from "class-validator";

export class UpdateCompanyDto {
  @IsOptional()
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
