import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  DocumentInFolder,
  DocumentInFolderSchema,
} from "./DocumentInFolder.schema";
import { Module, ModuleSchema } from "./Module.schema";
// import { FundingType } from "src/utils/noSQLSchema/FolderType";

@Schema()
export class Quote {
  @Prop({ type: DocumentInFolderSchema })
  quoteFile: DocumentInFolder;

  // @Prop({
  //   type: {
  //     fundingType: { type: String, enum: FundingType },
  //     clientId: String,
  //     modules: ModuleSchema,
  //     invoice: DocumentInFolderSchema,
  //   },
  // })
  // trainingAgreement: {
  //   fundingType: FundingType;
  //   clientId: string;
  //   modules: Module;
  //   invoice: DocumentInFolder;
  // };

  @Prop()
  Price: number;

  @Prop()
  needAnalysis: string;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
