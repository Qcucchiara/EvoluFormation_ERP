import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateModuleDto } from "./dto/create-module.dto";
import { UpdateModuleDto } from "./dto/update-module.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "express";
import handleDeleteOnRestrictResponse from "src/utils/handleDeleteOnRestrictResponse";
import * as INDEX from "../utils/index.CommentCategory.json";
import createIndexComment from "src/utils/createIndexComment";
import returnResponse from "src/utils/responseFunctions/res.return";
import returnError from "src/utils/responseFunctions/error.return";

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateModuleDto, res: Response) {
    try {
      const isNameExist = await this.prisma.module.findUnique({
        where: { title: dto.title },
      });
      if (isNameExist) {
        throw new ForbiddenException("Le titre existe déjà.");
      }

      // TODO: rajouter le nom des catégories BPF directement dans la table module
      if (dto.duration) dto.duration = dto.duration + "";
      const data = await this.prisma.module.create({ data: { ...dto } });

      createIndexComment(this.prisma, { module_id: data.id });

      return returnResponse(res, "Le module a été correctement créé.");
    } catch (error) {
      return returnError(res, error);
    }
  }

  async findAll(res: Response) {
    try {
      const data = await this.prisma.module.findMany();
      return returnResponse(res, "La liste de modules a été envoyé", data);
    } catch (error) {
      return returnError(res, error);
    }
  }

  async findOne(id: string, res: Response) {
    try {
      const data = await this.prisma.module.findUnique({
        where: { id: id },
      });
      if (!data) {
        throw new ForbiddenException("Le module n'a pas été trouvé");
      }
      return returnResponse(res, "Le module a été envoyé.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }

  async update(id: string, dto: UpdateModuleDto, res: Response) {
    try {
      const findModule = await this.prisma.module.findUnique({
        where: { id: id },
      });

      if (!findModule) {
        throw new ForbiddenException("Le module n'a pas été trouvé");
      }

      const findSameTitle = await this.prisma.module.findMany({
        where: { title: dto.title },
      });

      if (findSameTitle || findSameTitle.length !== 0) {
        throw new ForbiddenException("Titre du module existe déjà");
      }

      const updatedModule = this.prisma.module.update({
        where: { id: id },
        data: { ...dto },
      });

      return returnResponse(res, "Le module a été modifié.");
    } catch (error) {
      return returnError(res, error);
    }
  }

  async remove(id: string, res: Response) {
    try {
      const data = await this.prisma.module.delete({ where: { id: id } });
      return returnResponse(res, "Module supprimé.", data);
    } catch (error) {
      const content = await handleDeleteOnRestrictResponse(
        this.prisma,
        id,
        "module",
        ["module_has_trainer", "comment"],
      );

      return returnError(res, error, content);
    }
  }
}
