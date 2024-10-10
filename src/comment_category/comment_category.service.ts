import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateCommentCategoryDto } from "./dto/create-comment_category.dto";
import { UpdateCommentCategoryDto } from "./dto/update-comment_category.dto";
import { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import returnResponse from "src/utils/responseFunctions/res.return";
import returnError from "src/utils/responseFunctions/error.return";

@Injectable()
export class CommentCategoryService {
  constructor(private prisma: PrismaService) {}

  create(dto, res: Response) {
    try {
      const data = this.prisma.comment_category.create({ data: { ...dto } });

      return returnResponse(res, "Catégorie créée.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }

  findAll(res: Response) {
    try {
      const data = this.prisma.comment_category.findMany();
      return returnResponse(res, "Liste catégories envoyée.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }

  async findOne(id: string, res: Response) {
    try {
      const data = await this.prisma.comment_category.findUnique({
        where: { id: id },
      });

      if (!data) {
        throw new ForbiddenException("La catégorie n'existe pas.");
      }
      return returnResponse(res, "Catégorie envoyé.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }

  async update(id: string, dto, res: Response) {
    try {
      const curentCateory = await this.prisma.comment_category.findUnique({
        where: { id: id },
      });

      if (!curentCateory) {
        throw new ForbiddenException("La catégorie n'exise pas.");
      }
      const data = await this.prisma.comment_category.update({
        where: { id: id },
        data: { ...dto },
      });

      return returnResponse(res, "Catégorie modifié.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }

  async remove(id: string, res: Response) {
    try {
      const curentCateory = await this.prisma.comment_category.findUnique({
        where: { id: id },
      });

      if (!curentCateory) {
        throw new ForbiddenException("La catégorie n'exise pas.");
      }

      const data = await this.prisma.comment_category.delete({
        where: { id: id },
      });
      return returnResponse(res, "Catégorie supprimée.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }
}
