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
import { ModuleService } from "./module.service";
import { CreateModuleDto } from "./dto/create-module.dto";
import { UpdateModuleDto } from "./dto/update-module.dto";
import { Response } from "express";

@Controller("module")
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Post()
  async create(@Body() dto: CreateModuleDto, @Res() res: Response) {
    return this.moduleService.create(dto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.moduleService.findAll(res);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Res() res: Response) {
    return this.moduleService.findOne(id, res);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateModuleDto,
    @Res() res: Response,
  ) {
    return this.moduleService.update(id, dto, res);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Res() res: Response) {
    return this.moduleService.remove(id, res);
  }
}
