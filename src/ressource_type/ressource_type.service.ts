import { Injectable } from "@nestjs/common";
import { CreateRessourceTypeDto } from "./dto/create-ressource_type.dto";
import { UpdateRessourceTypeDto } from "./dto/update-ressource_type.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RessourceTypeService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateRessourceTypeDto) {
    return this.prisma.ressource_type.create({ data: { ...dto } });
  }

  findAll() {
    return this.prisma.ressource_type.findMany();
  }

  findOne(id: string) {
    return this.prisma.ressource_type.findUnique({ where: { id: id } });
  }

  update(id: string, dto: UpdateRessourceTypeDto) {
    return this.prisma.ressource_type.update({
      where: { id: id },
      data: { ...dto },
    });
  }

  remove(id: string) {
    return this.prisma.ressource_type.delete({ where: { id: id } });
  }
}
