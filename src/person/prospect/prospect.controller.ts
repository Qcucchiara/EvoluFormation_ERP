import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ProspectService } from "./prospect.service";
import { createProspectDto, updateProspectDto } from "../dto/index";

@Controller("prospect")
export class prospectController {
  constructor(private readonly prospectService: ProspectService) {}

  @Get()
  getAllProspect() {
    return this.prospectService.getAllProspect();
  }
  @Get("/:id")
  getProspectById(@Param("id") id: string) {
    return this.prospectService.getProspectById(id);
  }
  @Post()
  insertProspect(@Body() dto: createProspectDto) {
    return this.prospectService.insertProspect(dto);
  }

  @Patch()
  updateProspect(@Body() dto: updateProspectDto) {
    return this.prospectService.updateProspect(dto);
  }

  @Delete("/:id")
  deleteProspect(@Param("id") id: string) {
    return this.prospectService.deleteProspect(id);
  }
}
