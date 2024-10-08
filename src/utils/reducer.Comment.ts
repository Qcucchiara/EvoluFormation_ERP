import { PrismaService } from "src/prisma/prisma.service";

function commentReducer(prisma: PrismaService, dto) {
  switch (dto) {
    case dto.company_id:
      prisma.comment.create({ data: { ...dto } });
      break;
    case dto.person_id:
      break;
    case dto.module_id:
      break;
    case dto.ressource_id:
      break;

    default:
      break;
  }
}
