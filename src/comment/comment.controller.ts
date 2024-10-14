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
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Response } from "express";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() dto, @Res() res: Response) {
    return this.commentService.create(dto, res);
  }

  @Get("/all")
  findAll(@Res() res: Response) {
    return this.commentService.findAll(res);
  }

  @Get("/entity/:entity_id")
  findAllFromEntity(
    @Param("entity_id") entity_id: string,
    @Res() res: Response,
  ) {
    return this.commentService.findAllFromEntity(entity_id, res);
  }

  @Get("/categories/:entity_id")
  findCategoriesFromEntity(
    @Param("entity_id") entity_id: string,
    @Res() res: Response,
  ) {
    return this.commentService.findCategoriesFromEntity(entity_id, res);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Res() res: Response) {
    return this.commentService.findOne(id, res);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto, @Res() res: Response) {
    return this.commentService.update(id, dto, res);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Res() res: Response) {
    return this.commentService.remove(id, res);
  }
}
