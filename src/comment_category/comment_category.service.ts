import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreateCommentCategoryDto } from "./dto/create-comment_category.dto";
import { UpdateCommentCategoryDto } from "./dto/update-comment_category.dto";
import { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CommentCategoryService {
  constructor(private prisma: PrismaService) {}

  create(dto, res: Response) {
    try {
      const data = this.prisma.comment_category.create({ data: { ...dto } });
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
        // error: error,
      });
    }
  }

  findAll(res: Response) {
    try {
      const data = this.prisma.comment_category.findMany();
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Liste de catégories envoyée.",
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
      const data = await this.prisma.comment_category.findUnique({
        where: { id: id },
      });

      if (!data) {
        throw new ForbiddenException("La catégorie n'existe pas.");
      }
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Catégorie envoyée.",
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

  async update(id: string, dto, res: Response) {
    try {
      const curentCateory = await this.prisma.comment_category.findUnique({
        where: { id: id },
      });

      if (!curentCateory) {
        throw new ForbiddenException("La catégorie n'exise pas.");
      }
      //TODO: en cours -- Quentin
      // const data = await this.prisma.comment_category.update({where: {id: id}, })
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Catégorie modifié avec succès.",
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

  remove(id: string, res: Response) {
    try {
      const data = {};
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Catégorie supprimée avec succès.",
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
}
