import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  DocumentInFolder,
  DocumentInFolderSchema,
} from "./DocumentInFolder.schema";
import { Trainee, TraineeSchema } from "./Trainee.schema";
import { Trainer, TrainerSchema } from "./Trainer.schema";

@Schema()
export class Session {
  @Prop()
  place: string;

  @Prop()
  date: string;

  @Prop()
  duration: number;

  @Prop({ type: DocumentInFolderSchema })
  signatureSheet: DocumentInFolder;

  @Prop([{ type: TraineeSchema }])
  trainees: Trainee[];

  @Prop([{ type: TrainerSchema }])
  trainers: Trainer[];

  @Prop([
    {
      type: {
        date: String,
        hours: {
          start: Number,
          end: Number,
        },
        periodsInfo: String,
      },
    },
  ])
  periods: {
    date: string;
    hours: {
      start: number;
      end: number;
    };
    periodsInfo: string;
  }[];
}

export const SessionSchema = SchemaFactory.createForClass(Session);
