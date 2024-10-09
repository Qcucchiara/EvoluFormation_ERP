import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "express";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCommentDto, res: Response) {
    try {
      const isExistComment = await this.prisma.comment.findMany({
        where: {
          OR: [
            { company_id: dto.company_id },
            { person_id: dto.person_id },
            { module_id: dto.module_id },
            { ressource_id: dto.ressource_id },
          ],
        },
      });

      if (!isExistComment) {
        throw new ForbiddenException(
          "Problème lors de la création de l'entité. (not found)",
        );
      } else if (isExistComment.length > 1) {
        throw new ForbiddenException(
          "Problème lors de la création de l'entité. (not unique)",
        );
      }

      const category = await this.prisma.comment_category.findUnique({
        where: { id: dto.category_id },
      });

      if (!category) {
        // vérifier si la catégorie existe, sinon en créer une nouvelle?
        throw new ForbiddenException("La catégorie n'existe pas."); //?: en créer une nouvelle ?
      }

      if (category.is_unique === true) {
        const isCommentExist = await this.prisma.comment.findFirst({
          where: { category_id: category.id },
        });
        if (isCommentExist) {
          throw new ForbiddenException(
            `Un commentaire existe déjà dans la catégorie unique: ${category.name}`,
          );
        }
      }
      const data = await this.prisma.comment.create({ data: { ...dto } });

      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Le dossier a été correctement créée",
        // data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);
      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        // error: error,
      });
    }
  }

  async findAll(res: Response) {
    try {
      const data = await this.prisma.comment.findMany();
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Liste Envoyée",
        data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);
      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        // error: error,
      });
    }
  }

  async findOne(id: string, res: Response) {
    try {
      const data = await this.prisma.comment.findUnique({ where: { id: id } });

      if (!data) {
        throw new ForbiddenException("Le commentaire n'a pas été trouvé.");
      }
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Le commentaire est envoyé",
        data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);
      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        // error: error,
      });
    }
  }

  async update(id: string, dto: CreateCommentDto, res: Response) {
    try {
      const isCommentExist = await this.prisma.comment.findUnique({
        where: { id: id },
      });

      if (!isCommentExist) {
        throw new ForbiddenException("Le commentaire n'existe pas.");
      }

      const data = await this.prisma.comment.update({
        where: { id: id },
        data: { ...dto },
      });

      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Le dossier a été correctement créée",
        data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);
      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        // error: error,
      });
    }
  }

  async remove(id: string, res: Response) {
    try {
      const isCommentExist = await this.prisma.comment.findUnique({
        where: { id: id },
      });

      if (!isCommentExist) {
        throw new ForbiddenException("Le commentaire n'a pas été trouvé.");
      }

      const data = await this.prisma.comment.delete({ where: { id: id } });

      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Le commentaire a été correctement supprimé.",
        data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);
      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        // error: error,
      });
    }
  }
}
