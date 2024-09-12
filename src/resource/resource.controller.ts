import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ResourceService } from "./resource.service";
// import { UpdateResourceDto } from "./dto/update-resource.dto";

@Controller("resource")
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Post()
  create() {
    return this.resourceService.create();
  }

  @Get()
  findAll() {
    return this.resourceService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.resourceService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string) {
    return this.resourceService.update(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.resourceService.remove(id);
  }
}
