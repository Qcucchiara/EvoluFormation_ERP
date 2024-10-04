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

  @Get()
  findAll(@Res() res: Response) {
    return this.commentService.findAll(res);
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
