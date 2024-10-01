import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Session, SessionSchema } from "./Session.schema";

@Schema()
export class Module {
  @Prop()
  moduleId: string;

  @Prop()
  duration: string; // format de dates manuelle (12, 13, 15 octobre ...)

  @Prop({ type: SessionSchema })
  sessions: Session;
}
export const ModuleSchema = SchemaFactory.createForClass(Module);
