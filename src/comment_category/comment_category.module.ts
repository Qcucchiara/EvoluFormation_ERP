import { Module } from '@nestjs/common';
import { CommentCategoryService } from './comment_category.service';
import { CommentCategoryController } from './comment_category.controller';

@Module({
  controllers: [CommentCategoryController],
  providers: [CommentCategoryService],
})
export class CommentCategoryModule {}
