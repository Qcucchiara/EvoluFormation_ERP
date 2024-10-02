import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateRessourceTypeDto } from "./dto/create-ressource_type.dto";
import { UpdateRessourceTypeDto } from "./dto/update-ressource_type.dto";
import { PrismaService } from "src/prisma/prisma.service";
import handleDeleteOnRestrictResponse from "src/utils/handleDeleteOnRestrictResponse";
import { Response } from "express";

@Injectable()
export class RessourceTypeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRessourceTypeDto, res: Response) {
    try {
      const ressourceAlredyExist = await this.prisma.ressource_type.findUnique({
        where: { slug: dto.name.toLowerCase().replace(" ", "_") },
      });
      if (ressourceAlredyExist) {
        throw new ForbiddenException("le type de ressource existe déjà.");
      }
      const data = await this.prisma.ressource_type.create({
        data: { slug: dto.name.toLowerCase().replace(" ", "_"), ...dto },
      });
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "La catégorie a été crée.",
        // data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);

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
      const data = await this.prisma.ressource_type.findMany();
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "La liste de catégories a été envoyé.",
        data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);

      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        // error: { error: "Database connection error" },
      });
    }
  }

  async findOne(id: string, res: Response) {
    try {
      const data = await this.prisma.ressource_type.findUnique({
        where: { id: id },
      });

      if (!data) {
        throw new ForbiddenException("La catégorie n'a pas été trouvé.");
      }
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "La catégorie a été trouvé.",
        data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);

      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        // error: { error: "Database connection error" },
      });
    }
  }

  async update(id: string, dto: UpdateRessourceTypeDto, res: Response) {
    try {
      const ressourceExist = await this.prisma.ressource_type.findUnique({
        where: { id: id },
      });
      if (!ressourceExist) {
        throw new ForbiddenException("la catégorie n'a pas été trouvé.");
      }
      const data = await this.prisma.ressource_type.update({
        where: { id: id },
        data: { ...dto },
      });
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "La liste des catégories a été envoyé",
        data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);

      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        // error: { error: "Database connection error" },
      });
    }
  }

  async remove(id: string, res: Response) {
    try {
      const isRessourceTypeExist = await this.prisma.ressource_type.findUnique({
        where: { id: id },
      });

      if (!isRessourceTypeExist) {
        throw new ForbiddenException("la catégorie n'a pas été trouvé.");
      }
      const data = await this.prisma.ressource_type.delete({
        where: { id: id },
      });
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "La liste des catégories a été envoyé",
        data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);

      const errorData = await handleDeleteOnRestrictResponse(
        this.prisma,
        id,
        "type",
        ["ressource", "trucquidevraitpasmarcher"],
      );
      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        error: errorData,
      });
    }
  }
}
