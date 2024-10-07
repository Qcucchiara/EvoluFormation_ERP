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

class DocumentInFolder {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  filePath: string;
}
class Trainee {
  @IsString()
  @IsNotEmpty()
  traineeId: string;

  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  trainingCertificate: DocumentInFolder;

  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  skillsAssessment: DocumentInFolder;

  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  placementTest: DocumentInFolder;

  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  hotEvaluation: DocumentInFolder;
}
class Trainer {
  @IsString()
  @IsNotEmpty()
  trainerId: string;

  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  contract: DocumentInFolder;

  @IsString()
  @IsNotEmpty()
  opinion: string;
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

  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  signatureSheet: DocumentInFolder;

  @ValidateNested({ each: true })
  @Type(() => Trainee)
  @ArrayNotEmpty()
  trainees: Trainee[];

  @ArrayNotEmpty()
  trainers: Trainer[];

  //   periods: {
  //     date: string;
  //     hours: {
  //       start: number;
  //       end: number;
  //     };
  //     periodsInfo: string;
  //   }[];
}
