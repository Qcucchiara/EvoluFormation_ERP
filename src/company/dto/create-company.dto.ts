import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
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

export class LinkToPersonDTO {
  @IsNotEmpty()
  @IsUUID()
  company_id: string;

  @IsNotEmpty()
  @IsUUID()
  person_id: string;

  @IsOptional()
  @IsString()
  quality: string;
}
