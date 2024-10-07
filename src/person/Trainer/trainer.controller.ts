import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { ProspectService } from "../prospect/prospect.service";
import { TrainerService } from "./trainer.service";
import { createTrainerDTO } from "../dto/create-trainer.dto";
import { stringify } from "querystring";
import { Response } from "express";
import { updateTrainerDTO } from "../dto";

@Controller("trainer")
export class trainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  create(@Body() dto: createTrainerDTO, @Res() res: Response) {
    return this.trainerService.create(dto, res);
  }

  @Get()
  findAll() {
    return this.trainerService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.trainerService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: updateTrainerDTO) {
    return this.trainerService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.trainerService.remove(id);
  }
}
