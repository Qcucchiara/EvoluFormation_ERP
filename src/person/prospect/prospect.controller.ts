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

  @Post()
  create(@Body() dto: createProspectDto) {
    return this.prospectService.create(dto);
  }
  @Get()
  findAll() {
    return this.prospectService.findAll();
  }
  @Get("/:id")
  findOne(@Param("id") id: string) {
    return this.prospectService.findOne(id);
  }

  @Patch("/:id")
  toggleBlacklist(@Param("id") id: string) {
    return this.prospectService.toggleBlacklist(id);
  }
  @Patch("/:id")
  update(@Param("id") id: string, @Body() dto: updateProspectDto) {
    return this.prospectService.update(id, dto);
  }

  @Delete("/:id")
  remove(@Param("id") id: string) {
    return this.prospectService.remove(id);
  }
}
