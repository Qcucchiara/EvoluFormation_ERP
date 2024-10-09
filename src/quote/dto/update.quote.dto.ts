import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { trainingAgreement } from "./create.quote.dto";
import { DocumentInFolder } from "src/schemas/DocumentInFolder.schema";

export class UpdateQuoteDTO{

        @ValidateNested({ each: true })
        @Type(() => DocumentInFolder)
        quoteFile: DocumentInFolder;
      
        @ValidateNested({ each: true })
        @Type(() => trainingAgreement)
        trainingAgreement: trainingAgreement;
      
        @IsNumber()
        @IsOptional()
        price: number;
      
        @IsString()
        @IsOptional()
        neeedAnalysis: string;
}