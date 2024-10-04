import { Module } from "@nestjs/common";
import { SessionService } from "./session.service";
import { SessionController } from "./session.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Session, SessionSchema } from "src/schemas/Session.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
