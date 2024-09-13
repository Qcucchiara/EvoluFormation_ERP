import { Injectable } from "@nestjs/common";
// import { CreateResourceDto } from './dto/create-resource.dto';
import { PrismaService } from "src/prisma/prisma.service";
import { CreateResourceDto, UpdateResourceDto } from "./dto";

@Injectable()
export class ResourceService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateResourceDto) {
    return this.prisma.ressource.create({ data: { ...dto } });
  }

  findAll() {
    return this.prisma.ressource.findMany();
  }

  findOne(id: string) {
    return this.prisma.ressource.findUnique({ where: { id: id } });
  }

  async update(id: string, dto: UpdateResourceDto) {
    const typeOfressource = await this.prisma.ressource.findFirst({
      where: { id: id },
      include: { Ressource_type: true },
    });

    if (typeOfressource.Ressource_type.name === "material") {
      return this.prisma.ressource.update({
        where: { id: id },
        data: {
          name: dto.name,
          price: dto.price,
          acquisition_date: dto.acquisition_date,
        },
      });
    } else if (typeOfressource.Ressource_type.name === "place") {
      return this.prisma.ressource.update({
        where: { id: id },
        data: {
          name: dto.name,
          price: dto.price,
          adress: dto.adress,
          postal_code: dto.postal_code,
          city: dto.ciy
        },
      });
    }
  }

  remove(id: string) {
    return this.prisma.ressource.delete({where:{id:id}})
  }
}
