import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCommentDto {
  @IsOptional()
  @IsUUID()
  company_id: string;

  @IsOptional()
  @IsUUID()
  person_id: string;

  @IsOptional()
  @IsUUID()
  module_id: string;

  @IsOptional()
  @IsUUID()
  ressource_id: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsUUID()
  category_id: string;
}
