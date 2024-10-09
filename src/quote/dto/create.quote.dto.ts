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
  @IsNotEmpty()
  quoteFile: DocumentInFolder;

  @ValidateNested({ each: true })
  @Type(() => trainingAgreement)
  @IsNotEmpty()
  trainingAgreement: {};

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  needAnalysis: string;
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
  @IsNotEmpty()
  modules: {};

  @ValidateNested({ each: true })
  @Type(() => DocumentInFolder)
  @IsNotEmpty()
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
