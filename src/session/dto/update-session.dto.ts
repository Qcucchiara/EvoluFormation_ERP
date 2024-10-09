// import { PartialType } from '@nestjs/mapped-types';
// import { CreateSessionDto } from './create-session.dto';

import { Type } from "class-transformer";
import {
  IsOptional,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import {
  DocumentInFolder,
  periods,
  Trainee,
  Trainer,
} from "./create-session.dto";

// export class UpdateSessionDto extends PartialType(CreateSessionDto) {}

export class UpdateSessionDto {
  @IsString()
  @IsOptional()
  place: string;

  @IsString()
  @IsOptional()
  date: string;

  @IsNumber()
  @IsOptional()
  duration: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  signatureSheet: DocumentInFolder;

  @ValidateNested({ each: true })
  @Type(() => Trainee)
  trainees: Trainee[];

  @ValidateNested({ each: true })
  @Type(() => Trainer)
  trainers: Trainer[];

  @ValidateNested({ each: true })
  @Type(() => periods)
  periods: periods[];
}
