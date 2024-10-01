import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientFolderService } from './client-folder.service';
import { CreateClientFolderDto } from './dto/create-client-folder.dto';
import { UpdateClientFolderDto } from './dto/update-client-folder.dto';

@Controller('client-folder')
export class ClientFolderController {
  constructor(private readonly clientFolderService: ClientFolderService) {}

  @Post()
  create(@Body() createClientFolderDto: CreateClientFolderDto) {
    return this.clientFolderService.create(createClientFolderDto);
  }

  @Get()
  findAll() {
    return this.clientFolderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientFolderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientFolderDto: UpdateClientFolderDto) {
    return this.clientFolderService.update(+id, updateClientFolderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientFolderService.remove(+id);
  }
}
