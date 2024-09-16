import { PrismaService } from "src/prisma/prisma.service";

export default async function handleDeleteOnRestrictResponse(
  prisma: PrismaService,
  entityId: string,
  nameFK: string,
  listRelationModels: string[],
) {
  let res = [];

  for (let i = 0; i < listRelationModels.length; i++) {
    const element = listRelationModels[i];

    if (typeof prisma[element] !== "undefined") {
      const entityList = await prisma[element].findMany({
        where: { [`${nameFK}_id`]: entityId },
      });
      res.push({ model: element, list: entityList });
    } else {
      res.push(`${element} n'est pas un model prisma valide du schéma`);
    }
  }

  return res;
}
