import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { CommentCategoryService } from "./comment_category.service";
import { CreateCommentCategoryDto } from "./dto/create-comment_category.dto";
import { UpdateCommentCategoryDto } from "./dto/update-comment_category.dto";
import { Response } from "express";

@Controller("comment-category")
export class CommentCategoryController {
  constructor(
    private readonly commentCategoryService: CommentCategoryService,
  ) {}

  @Post()
  create(@Body() dto, @Res() res: Response) {
    return this.commentCategoryService.create(dto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.commentCategoryService.findAll(res);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Res() res: Response) {
    return this.commentCategoryService.findOne(id, res);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto, @Res() res: Response) {
    return this.commentCategoryService.update(id, dto, res);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Res() res: Response) {
    return this.commentCategoryService.remove(id, res);
  }
}
