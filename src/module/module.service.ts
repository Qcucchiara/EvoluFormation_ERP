import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateModuleDto } from "./dto/create-module.dto";
import { UpdateModuleDto } from "./dto/update-module.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateModuleDto) {
    try {
      const isNameExist = await this.prisma.module.findUnique({
        where: { title: dto.title },
      });
      if (!isNameExist) {
        throw new ForbiddenException(
          "Un module avec le même titre existe déjà.",
        );
      }
      // await this.prisma.module.create({ data: { ...dto } });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  findAll() {
    return `This action returns all module`;
  }

  findOne(id: string) {
    return `This action returns a #${id} module`;
  }

  update(id: string, dto: UpdateModuleDto) {
    return `This action updates a #${id} module`;
  }

  remove(id: string) {
    return `This action removes a #${id} module`;
  }
}
