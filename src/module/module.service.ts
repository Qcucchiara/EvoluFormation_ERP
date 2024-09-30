import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateModuleDto } from "./dto/create-module.dto";
import { UpdateModuleDto } from "./dto/update-module.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "express";
import handleDeleteOnRestrictResponse from "src/utils/handleDeleteOnRestrictResponse";

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateModuleDto, res: Response) {
    try {
      const isNameExist = await this.prisma.module.findUnique({
        where: { title: dto.title },
      });
      if (isNameExist) {
        throw new ForbiddenException(
          "Un module avec le même titre existe déjà.",
        );
      }
      console.log(dto);
      const data = await this.prisma.module.create({
        data: { ...dto, speciality_bpf_id: dto.speciality_bpf_id },
      });
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Le module a été correctement créé",
        // data: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        // error: { error: "Database connection error" },
      });
    }
  }

  async findAll(res: Response) {
    try {
      const data = await this.prisma.module.findMany();
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "La liste de modules a été envoyé",
        data: data,
      });
    } catch (error) {
      console.log(error);
      res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        // error: { error: "Database connection error" },
      });
    }
  }

  async findOne(id: string, res: Response) {
    try {
      const findModule = await this.prisma.module.findUnique({
        where: { id: id },
      });
      if (!findModule) {
        throw new ForbiddenException("Le module n'a pas été trouvé");
      }
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "La liste de modules a été envoyé",
        data: findModule,
      });
    } catch (error) {
      console.log(error);
      res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        // error: { error: "Database connection error" },
      });
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

      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "La liste de modules a été envoyé",
        data: updatedModule,
      });
    } catch (error) {
      console.log(error);
      res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        // error: { error: "Database connection error" },
      });
    }
  }

  async remove(id: string, res: Response) {
    try {
      const data = await this.prisma.module.delete({ where: { id: id } });
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "La liste de modules a été envoyé",
        data: data,
      });
    } catch (error) {
      const content = await handleDeleteOnRestrictResponse(
        this.prisma,
        id,
        "module",
        ["module_has_trainer", "comment"],
      );
      console.log(error);
      res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message ? error.message : "Unexpected error",
        error: content,
      });
    }
  }
}
