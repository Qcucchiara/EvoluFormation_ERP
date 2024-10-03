import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { ProspectService } from "./prospect.service";
import { createProspectDto, updateProspectDto } from "../dto/index";
import { Response } from "express";
@Controller("prospect")
export class prospectController {
  constructor(private readonly prospectService: ProspectService) {}

  @Post()
  create(@Body() dto: createProspectDto, @Res() res: Response) {
    return this.prospectService.create(dto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.prospectService.findAll(res);
  }
  @Get("/blacklist")
  findAllBlacklist(@Res() res: Response) {
    return this.prospectService.findAllBlacklist(res);
  }
  @Get("/:id")
  findOne(@Param("id") id: string, @Res() res: Response) {
    return this.prospectService.findOne(id, res);
  }

  @Patch("/blacklist/:id")
  toggleBlacklist(@Param("id") id: string, @Res() res: Response) {
    return this.prospectService.toggleBlacklist(id, res);
  }
  @Patch("/:id")
  update(
    @Param("id") id: string,
    @Body() dto: updateProspectDto,
    @Res() res: Response,
  ) {
    return this.prospectService.update(id, dto, res);
  }

  @Delete("/:id")
  remove(@Param("id") id: string, @Res() res: Response) {
    return this.prospectService.remove(id, res);
  }
}
