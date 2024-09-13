import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RessourceTypeService } from './ressource_type.service';
import { CreateRessourceTypeDto } from './dto/create-ressource_type.dto';
import { UpdateRessourceTypeDto } from './dto/update-ressource_type.dto';

@Controller('ressource-type')
export class RessourceTypeController {
  constructor(private readonly ressourceTypeService: RessourceTypeService) {}

  @Post()
  create(@Body() dto: CreateRessourceTypeDto) {
    return this.ressourceTypeService.create(dto);
  }

  @Get()
  findAll() {
    return this.ressourceTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ressourceTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRessourceTypeDto) {
    return this.ressourceTypeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ressourceTypeService.remove(id);
  }
}
