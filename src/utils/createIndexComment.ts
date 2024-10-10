import { PrismaService } from "src/prisma/prisma.service";
import * as INDEX from "../utils/index.CommentCategory.json";
import { EntityType } from "@prisma/client";

type CreateIndexCommentParam = { entity_id: string; entity_type: EntityType };

export default async function createIndexComment(
  prisma: PrismaService,
  param: CreateIndexCommentParam,
) {
  const index = await prisma.comment_category.findFirst({
    where: { name: "INDEX" },
  });
  return await prisma.comment.create({
    data: {
      ...param,
      title: "INDEX",
      content: "INDEX",
      category_id: index.id,
    },
  });
}
