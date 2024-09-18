import { Module } from "@nestjs/common";
import { PersonService } from "./person.service";
import { PersonController } from "./person.controller";
import { ProspectService } from "./prospect/prospect.service";
import { prospectController } from "./prospect/prospect.controller";
import { StudentController } from "./Student/student.controller";
import { StudentService } from "./Student/student.service";

@Module({
  controllers: [PersonController, prospectController, StudentController],
  providers: [PersonService, ProspectService, StudentService],
})
export class PersonModule {}
