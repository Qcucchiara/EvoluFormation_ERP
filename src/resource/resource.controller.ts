import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ResourceService } from "./resource.service";
import { CreateResourceDto, UpdateResourceDto } from "./dto";
import { Response } from "express";
import { JwtGuard } from "src/auth/guards";

// @UseGuards(JwtGuard)
@Controller("resource")
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  create(@Body() dto: CreateResourceDto, @Res() res: Response) {
    return this.resourceService.create(dto, res);
  }

  @Get("/test")
  findAll(@Res() res: Response) {
    return this.resourceService.findAll(res);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Res() res: Response) {
    return this.resourceService.findOne(id, res);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateResourceDto,
    @Res() res: Response,
  ) {
    return this.resourceService.update(id, dto /*, res*/);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Res() res: Response) {
    return this.resourceService.remove(id, res);
  }
}
