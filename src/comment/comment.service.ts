import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "express";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(dto, res: Response) {
    try {
      // vérifier si l'entité a lier au commentaire existe.
      // vérifier si la catégorie existe, sinon en créer une nouvelle.
      // si la catégorie est unique, vérifier si un commentaire n'existe pas déjà.

      const category = await this.prisma.comment_category.findUnique({
        where: { name: dto.categoryName },
      });

      if (!category) {
        // vérifier si la catégorie existe, sinon en créer une nouvelle.
        throw new ForbiddenException("La catégorie n'existe pas."); //TODO: en créer une nouvelle
      }

      if (category.is_unique === true) {
      }

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

  findAll(res: Response) {
    return `This action returns all comment`;
  }

  findOne(id: string, res: Response) {
    return `This action returns a #${id} comment`;
  }

  update(id: string, dto, res: Response) {
    return `This action updates a #${id} comment`;
  }

  remove(id: string, res: Response) {
    return `This action removes a #${id} comment`;
  }
}
