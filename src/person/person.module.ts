import { Module } from "@nestjs/common";
import { PersonService } from "./person.service";
import { PersonController } from "./person.controller";
import { ProspectService } from "./prospect/prospect.service";
import { prospectController } from "./prospect/prospect.controller";

@Module({
  controllers: [PersonController, prospectController],
  providers: [PersonService, ProspectService],
})
export class PersonModule {}
