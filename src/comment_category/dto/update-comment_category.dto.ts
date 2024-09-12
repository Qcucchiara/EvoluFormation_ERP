import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentCategoryDto } from './create-comment_category.dto';

export class UpdateCommentCategoryDto extends PartialType(CreateCommentCategoryDto) {}
