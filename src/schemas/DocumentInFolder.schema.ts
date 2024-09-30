import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class DocumentInFolder {
  @Prop()
  fileName: string;

  @Prop()
  filePath: string;
}

export const DocumentInFolderSchema =
  SchemaFactory.createForClass(DocumentInFolder);
