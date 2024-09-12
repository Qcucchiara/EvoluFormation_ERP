import { Injectable } from '@nestjs/common';
import { CreateCommentCategoryDto } from './dto/create-comment_category.dto';
import { UpdateCommentCategoryDto } from './dto/update-comment_category.dto';

@Injectable()
export class CommentCategoryService {
  create(createCommentCategoryDto: CreateCommentCategoryDto) {
    return 'This action adds a new commentCategory';
  }

  findAll() {
    return `This action returns all commentCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commentCategory`;
  }

  update(id: number, updateCommentCategoryDto: UpdateCommentCategoryDto) {
    return `This action updates a #${id} commentCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} commentCategory`;
  }
}
