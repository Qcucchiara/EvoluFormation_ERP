import { Module } from "@nestjs/common";
import { PersonService } from "./person.service";
import { PersonController } from "./person.controller";
import { ProspectService } from "./prospect/prospect.service";
import { prospectController } from "./prospect/prospect.controller";
import { TrainerService } from "./Trainer/trainer.service";
import { trainerController } from "./Trainer/trainer.controller";
import { StudentController } from "./Student/student.controller";
import { StudentService } from "./Student/student.service";

@Module({
  controllers: [
    PersonController,
    prospectController,
    StudentController,
    trainerController,
  ],
  providers: [PersonService, ProspectService, StudentService, TrainerService],
})
export class PersonModule {}
