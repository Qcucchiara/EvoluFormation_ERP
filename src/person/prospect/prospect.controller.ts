import { Body, Controller, Patch, Post } from "@nestjs/common";
import { ProspectService } from "./prospect.service";
import { createProspectDto } from "../dto/index";

@Controller("prospect")
export class prospectController {
  constructor(private readonly prospectService: ProspectService) {}

  @Post()
  insertProspect(@Body() dto: createProspectDto) {
    return this.prospectService.insertProspect(dto);
  }

  @Patch()
  updateProspect(@Body() dto: any) {
    return this.prospectService.updateProspect(dto);
  }
}
