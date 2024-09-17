import { Injectable } from "@nestjs/common";
// import { CreateResourceDto } from './dto/create-resource.dto';
import { PrismaService } from "src/prisma/prisma.service";
import { CreateResourceDto, UpdateResourceDto } from "./dto";
import handleDeleteOnRestrictResponse from "src/utils/handleDeleteOnRestrictResponse";

@Injectable()
export class ResourceService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateResourceDto) {
    return this.prisma.ressource.create({ data: { ...dto } });
  }

  async findAll() {
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
          city: dto.ciy,
        },
      });
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.ressource.delete({ where: { id: id } });
    } catch (error) {
      return handleDeleteOnRestrictResponse(this.prisma, id, "ressource", [
        "comment",
        "trucquidevraitpasmarcher",
      ]);
    }
  }
}
