// type ClientFolder = {
//   companyId: string;
//   quotes: Quote[];
//   sessions: Session[];
//   pastTrainers: Trainer[];
//   trainees: Trainee[];
// };

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Trainee, TraineeSchema } from "./Trainee.schema";
import { Trainer, TrainerSchema } from "./Trainer.schema";
import { Quote, QuoteSchema } from "./Quote.schema";
import { Session, SessionSchema } from "./Session.schema";

@Schema()
export class ClientFolder {
  @Prop()
  company_has_personId: string;

  @Prop({ type: QuoteSchema })
  quotes: Quote;

  @Prop({ type: SessionSchema })
  sessions: Session;

  @Prop({ type: TrainerSchema })
  pastTrainers: Trainer;

  @Prop({ type: TraineeSchema })
  pastTrainees: Trainee;

  @Prop({ default: new Date() }) // ajout created_at et updated_at dans les dossiers.
  created_at: string;

  @Prop({ default: new Date() })
  updated_at: string;
}

export const ClientFolderSchema = SchemaFactory.createForClass(ClientFolder);
