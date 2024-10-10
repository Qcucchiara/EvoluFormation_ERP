import { EntityType } from "@prisma/client";
import {
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
  @IsUUID()
  category_id: string;
}
