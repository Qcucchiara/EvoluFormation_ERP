import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { RessourceTypeService } from "./ressource_type.service";
import { CreateRessourceTypeDto } from "./dto/create-ressource_type.dto";
import { UpdateRessourceTypeDto } from "./dto/update-ressource_type.dto";
import { Response } from "express";

@Controller("ressource-type")
export class RessourceTypeController {
  constructor(private readonly ressourceTypeService: RessourceTypeService) {}

  @Post()
  create(@Body() dto: CreateRessourceTypeDto, @Res() res: Response) {
    return this.ressourceTypeService.create(dto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.ressourceTypeService.findAll(res);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Res() res: Response) {
    return this.ressourceTypeService.findOne(id, res);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateRessourceTypeDto,
    @Res() res: Response,
  ) {
    return this.ressourceTypeService.update(id, dto, res);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Res() res: Response) {
    return this.ressourceTypeService.remove(id, res);
  }
}
