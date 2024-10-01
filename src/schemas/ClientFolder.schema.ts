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
  companyId: string;

  @Prop({ type: QuoteSchema })
  quotes: Quote;

  @Prop({ type: SessionSchema })
  sessions: Session;

  @Prop({ type: TrainerSchema })
  // TODO: demander si ça a un intérêt de lister les formateurs qui ont été commisionnés par chaque client
  pastTrainers: Trainer;

  @Prop({ type: TraineeSchema })
  pastTrainees: Trainee;
}

export const ClientFolderSchema = SchemaFactory.createForClass(ClientFolder);
