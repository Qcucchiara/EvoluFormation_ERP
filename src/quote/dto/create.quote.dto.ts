import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { CreateSessionDto, DocumentInFolder } from "src/session/dto";

export class CreateQuoteDTO {
  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  quoteFile: DocumentInFolder;

  @ValidateNested({ each: true })
  @Type(() => trainingAgreement)
  trainingAgreement: trainingAgreement;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  neeedAnalysis: string;
}
export class trainingAgreement {
  @IsString()
  @IsNotEmpty()
  foundingType: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  clientId: string;

  @ValidateNested({ each: true })
  @Type(() => Module)
  modules: Module;

  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  invoice: DocumentInFolder;
}
export class Module {
  @IsString()
  @IsNotEmpty()
  moduleId: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @ValidateNested({ each: true })
  @Type(() => CreateSessionDto)
  sessions: CreateSessionDto;
}
