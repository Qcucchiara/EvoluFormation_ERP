import { Injectable } from "@nestjs/common";
// import { CreateResourceDto } from './dto/create-resource.dto';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ResourceService {
  constructor(private prisma: PrismaService) {}
  create() {
    return this.prisma.ressource.create({
      data: {
        name: "test",
        type_id: "pour voir",
        price: 5.42,
      },
    });
  }

  findAll() {
    return this.prisma.ressource.findMany();
  }

  findOne(id: string) {
    return this.prisma.ressource.findUnique({ where: { id: id } });
  }

  update(id: string) {
    return this.prisma.ressource;
  }

  remove(id: string) {
    return `This action removes a #${id} resource`;
  }
}
