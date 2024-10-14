import { EntityType } from "@prisma/client";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsUUID()
  entity_id: string;

  @IsNotEmpty()
  @IsEnum(EntityType)
  entity_type: EntityType;

  @IsOptional()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  category_name: string;

  @IsOptional()
  @IsBoolean()
  is_unique: boolean;
}
