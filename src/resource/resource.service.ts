import { ForbiddenException, Injectable } from "@nestjs/common";
// import { CreateResourceDto } from './dto/create-resource.dto';
import { PrismaService } from "src/prisma/prisma.service";
import { CreateResourceDto, UpdateResourceDto } from "./dto";
import handleDeleteOnRestrictResponse from "src/utils/handleDeleteOnRestrictResponse";
import { Response } from "express";

@Injectable()
export class ResourceService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateResourceDto, res: Response) {
    try {
      // Tester si l'id de la catégorie assignée existe, sinon throw une erreur
      const category = await this.prisma.ressource_type.findUnique({
        where: { id: dto.type_id },
      });

      const data = await this.prisma.ressource.create({
        data: { type_name: category.name, ...dto },
      });

      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "La ressource a été correctement créée",
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
      const data = await this.prisma.ressource.findMany();
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "La liste a été récupéré",
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
      const data = await this.prisma.ressource.findUnique({
        where: { id: id },
      });

      if (!data) {
        throw new ForbiddenException("La ressurce n'a pas été trouvé.");
      }
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "La liste a été récupéré",
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

  async update(id: string, dto: UpdateResourceDto) {
    const listOfRessourcesTypes = await this.prisma.ressource_type.findMany();

    const typeOfressource = await this.prisma.ressource.findUnique({
      where: { id: id },
      include: { Ressource_type: true },
    });

    for (const ressourceType of listOfRessourcesTypes) {
      if (typeOfressource.Ressource_type.id === ressourceType.id) {
        await this.prisma.ressource.update({
          where: { id: id },
          data: {
            name: dto.name,
            price: dto.price,
            acquisition_date: dto.acquisition_date,
          },
        });
      }
    }

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

  async remove(id: string, res: Response) {
    try {
      const isRessourceExist = await this.prisma.ressource.findUnique({
        where: { id: id },
      });

      if (!isRessourceExist) {
        throw new ForbiddenException("La ressource n'a pas été trouvé.");
      }

      const data = await this.prisma.ressource.delete({ where: { id: id } });
      if (!data) {
        throw new ForbiddenException("La ressource n'a pas pu être supprimé.");
      }
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "La liste a été récupéré",
        data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);
      const errorData = await handleDeleteOnRestrictResponse(
        this.prisma,
        id,
        "ressource",
        ["comment", "trucquidevraitpasmarcher"],
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
