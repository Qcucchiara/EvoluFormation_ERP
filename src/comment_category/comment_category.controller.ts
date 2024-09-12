import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentCategoryService } from './comment_category.service';
import { CreateCommentCategoryDto } from './dto/create-comment_category.dto';
import { UpdateCommentCategoryDto } from './dto/update-comment_category.dto';

@Controller('comment-category')
export class CommentCategoryController {
  constructor(private readonly commentCategoryService: CommentCategoryService) {}

  @Post()
  create(@Body() createCommentCategoryDto: CreateCommentCategoryDto) {
    return this.commentCategoryService.create(createCommentCategoryDto);
  }

  @Get()
  findAll() {
    return this.commentCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentCategoryDto: UpdateCommentCategoryDto) {
    return this.commentCategoryService.update(+id, updateCommentCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentCategoryService.remove(+id);
  }
}
