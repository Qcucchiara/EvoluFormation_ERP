import { Module } from "@nestjs/common";
import { PersonService } from "./person.service";
import { PersonController } from "./person.controller";
import { ProspectService } from "./prospect/prospect.service";
import { prospectController } from "./prospect/prospect.controller";
import { TrainerService } from "./Trainer/trainer.service";
import { trainerController } from "./Trainer/trainer.controller";

@Module({
  controllers: [PersonController, prospectController, trainerController],
  providers: [PersonService, ProspectService, TrainerService],
})
export class PersonModule {}
