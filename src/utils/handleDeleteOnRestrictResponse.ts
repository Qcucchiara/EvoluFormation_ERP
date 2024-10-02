import { ConflictException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
/**
 *
 * @param prisma > import prisma
 * @param entityId > primary key of the entry
 * @param nameFK > name of the foreign keys without the "_id" suffix
 * @param listRelationModels > name of the method of each models
 * @param safeMode > if yes, return an array, if no, throw an error with the array.
 *
 * @returns > return an array of object per valid relation | and a string if the relation is wrong
 */
export default async function handleDeleteOnRestrictResponse(
  prisma: PrismaService,
  entityId: string,
  nameFK: string,
  listRelationModels: string[],
  safeMode?: boolean,
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

  // if (!safeMode) {
  //   throw new ConflictException({
  //     message:
  //       "des conflits avec d'autres tableaux ont été trouvés. \n" +
  //       "Veuillez corriger les contraintes avant de recommencer.",
  //     content: res,
  //   });
  // }
  return res;
}
