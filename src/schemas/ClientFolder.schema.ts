// type ClientFolder = {
//   companyId: string;
//   quotes: Quote[];
//   sessions: Session[];
//   pastTrainers: Trainer[];
//   trainees: Trainee[];
// };

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class ClientFolder {
  @Prop()
  companyId: string;

  @Prop()
  quotes: Quote[];

  @Prop()
  sessions: Session[];

  @Prop()
  // TODO: demander si ça a un intérêt de lister les formateurs qui ont été commisionnés par chaque client
  pastTrainers: Trainer[];

  @Prop()
  pastTrainees: Trainee[];
}

export const ClientFolderSchema = SchemaFactory.createForClass(ClientFolder);
