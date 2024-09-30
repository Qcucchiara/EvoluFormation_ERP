import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateRessourceTypeDto } from "./dto/create-ressource_type.dto";
import { UpdateRessourceTypeDto } from "./dto/update-ressource_type.dto";
import { PrismaService } from "src/prisma/prisma.service";
import handleDeleteOnRestrictResponse from "src/utils/handleDeleteOnRestrictResponse";

@Injectable()
export class RessourceTypeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRessourceTypeDto) {
    try {
      // // const ressourceAlredyExist = await this.prisma.ressource_type.findUnique({
      // //   where: { name: dto.name.toLowerCase() },
      // // });
      // if (ressourceAlredyExist) {
      //   throw new ForbiddenException("le type de ressource existe déjà.");
      // }
      // return this.prisma.ressource_type.create({
      //   data: { name: dto.name.toLowerCase(), ...dto },
      // });
    } catch (error) {
      console.log("ERROR: " + error.message);

      return error;
    }
  }

  findAll() {
    return this.prisma.ressource_type.findMany();
  }

  findOne(id: string) {
    try {
      return this.prisma.ressource_type.findUnique({ where: { id: id } });
    } catch (error) {
      console.log("ERROR: " + error.message);

      return error;
    }
  }

  async update(id: string, dto: UpdateRessourceTypeDto) {
    try {
      const ressourceExist = await this.prisma.ressource_type.findUnique({
        where: { id: id },
      });
      if (!ressourceExist) {
        throw new ForbiddenException(
          "le type de ressource n'a pas été trouvé.",
        );
      }
      return this.prisma.ressource_type.update({
        where: { id: id },
        data: { ...dto },
      });
    } catch (error) {
      console.log("ERROR: " + error.message);

      return error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.ressource_type.delete({ where: { id: id } });
    } catch (error) {
      return handleDeleteOnRestrictResponse(this.prisma, id, "type", [
        "ressource",
        "trucquidevraitpasmarcher",
      ]);
    }
  }
}
