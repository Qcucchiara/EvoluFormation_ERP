import { PrismaService } from "src/prisma/prisma.service";
import * as INDEX from "../utils/index.CommentCategory.json";

type CreateIndexCommentParam =
  | { company_id: string }
  | { person_id: string }
  | { module_id: string }
  | { ressource_id: string };

export default async function createIndexComment(
  prisma: PrismaService,
  param: CreateIndexCommentParam,
) {
  return await prisma.comment.create({
    data: {
      ...param,
      title: "INDEX",
      content: "INDEX",
      category_id: INDEX.INDEX_COMMENT_CATEGORY,
    },
  });
}
