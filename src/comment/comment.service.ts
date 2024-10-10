import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "express";
import returnResponse from "src/utils/responseFunctions/res.return";
import returnError from "src/utils/responseFunctions/error.return";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCommentDto, res: Response) {
    try {
      const isExistComment = await this.prisma.comment.findFirst({
        where: { entity_id: dto.entity_id },
      });

      if (!isExistComment) {
        throw new ForbiddenException(
          "Problème lors de la création de l'entité. (not found)",
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

      return returnResponse(res, "Commentaire créé.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }

  async findAll(res: Response) {
    try {
      const data = await this.prisma.comment.findMany();
      return returnResponse(res, "Commentaires envoyés.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }

  async findAllFromEntity(entity_id: string, res: Response) {
    try {
      const data = await this.prisma.comment.findMany({
        where: { entity_id: entity_id },
        include: { category: true },
      });
      if (!data) {
        // ?: je sais pas quoi mettre ici
      }

      return returnResponse(res, "Commentaires envoyés.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }

  async findOne(id: string, res: Response) {
    try {
      const data = await this.prisma.comment.findUnique({ where: { id: id } });

      if (!data) {
        throw new ForbiddenException("Le commentaire n'a pas été trouvé.");
      }
      return returnResponse(res, "Commentaire envoyé.", data);
    } catch (error) {
      console.log("ERROR: " + error.message);
      return returnError(res, error);
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

      return returnResponse(res, "Commentaire modifié.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }

  async updateCategory(comment_id: string, category_id: string, res: Response) {
    try {
      const isCommentExist = await this.prisma.comment.findUnique({
        where: { id: comment_id },
      });
      if (!isCommentExist) {
        throw new ForbiddenException("Le commentaire n'existe pas.");
      }
      const data = await this.prisma.comment.update({
        where: { id: comment_id },
        data: { category_id: category_id },
      });

      return returnResponse(
        res,
        "La catégorie du commentaire a été changé.",
        data,
      );
    } catch (error) {
      return returnError(res, error);
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
      return returnResponse(res, "Le commentaire a été supprimé.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }
}
