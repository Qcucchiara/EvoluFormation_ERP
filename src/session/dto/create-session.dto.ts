import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  MinLength,
  ValidateNested,
} from "class-validator";
// import { DocumentInFolder } from "src/schemas/DocumentInFolder.schema";
// import { Trainee } from "src/schemas/Trainee.schema";
// import { Trainer } from "src/schemas/Trainer.schema";

export class DocumentInFolder {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  filePath: string;
}
export class Trainee {
  @IsString()
  @IsNotEmpty()
  traineeId: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  trainingCertificate: DocumentInFolder;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  skillsAssessment: DocumentInFolder;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  placementTest: DocumentInFolder;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  hotEvaluation: DocumentInFolder;
}
export class Trainer {
  @IsString()
  @IsNotEmpty()
  trainerId: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  contract: DocumentInFolder;

  @IsString()
  @IsNotEmpty()
  opinion: string;
}
export class periods {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => hours)
  hours: {};

  @IsString()
  @IsNotEmpty()
  periodsInfo: string;
}
export class hours {
  @IsNumber()
  @IsNotEmpty()
  start: number;

  @IsNumber()
  @IsNotEmpty()
  end: number;
}
export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  place: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  signatureSheet: DocumentInFolder;

  @ValidateNested({ each: true })
  @Type(() => Trainee)
  @ArrayNotEmpty()
  trainees: Trainee[];

  @ValidateNested({ each: true })
  @Type(() => Trainer)
  @ArrayNotEmpty()
  trainers: Trainer[];

  @ValidateNested({ each: true })
  @Type(() => periods)
  @ArrayNotEmpty()
  periods: periods[];
}
