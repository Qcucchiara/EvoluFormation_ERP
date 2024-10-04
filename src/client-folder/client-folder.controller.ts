import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from "@nestjs/common";
import { ClientFolderService } from "./client-folder.service";
import { CreateClientFolderDto } from "./dto/create-client-folder.dto";
import { UpdateClientFolderDto } from "./dto/update-client-folder.dto";
import { JwtGuard } from "src/auth/guards";
import { Response } from "express";

@UseGuards(JwtGuard)
@Controller("client-folder")
export class ClientFolderController {
  constructor(private readonly clientFolderService: ClientFolderService) {}

  @Post()
  create(@Body() dto, @Res() res: Response) {
    return this.clientFolderService.create(dto, res);
  }

  @Get()
  findAll() {
    return this.clientFolderService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.clientFolderService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateClientFolderDto: UpdateClientFolderDto,
  ) {
    return this.clientFolderService.update(+id, updateClientFolderDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.clientFolderService.remove(+id);
  }
}
