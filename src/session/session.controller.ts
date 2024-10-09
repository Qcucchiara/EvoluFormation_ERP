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
import { SessionService } from "./session.service";
import { Response } from "express";
import { CreateSessionDto, UpdateSessionDto } from "./dto";

@Controller("session")
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  create(@Body() dto: CreateSessionDto, @Res() res: Response) {
    return this.sessionService.create(dto, res);
  }

  @Get()
  findAll() {
    return this.sessionService.findAll();
  }

  @Get("/:id")
  findOne(@Param("id") id: string) {
    return this.sessionService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateSessionDto) {
    return this.sessionService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.sessionService.remove(id);
  }
}
