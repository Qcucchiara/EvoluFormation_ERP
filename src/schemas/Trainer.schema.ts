import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  DocumentInFolder,
  DocumentInFolderSchema,
} from "./DocumentInFolder.schema";

@Schema()
export class Trainer {
  @Prop()
  trainerId: string;

  @Prop({ type: DocumentInFolderSchema })
  contract: DocumentInFolder;

  @Prop()
  opinion: string;
}

export const TrainerSchema = SchemaFactory.createForClass(Trainer);
