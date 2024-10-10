import { EntityType, PrismaClient, RoleName } from "@prisma/client";
import * as argon from "argon2";
import { RolePerson } from "../src/utils/const";
import * as fs from "node:fs";

const prisma = new PrismaClient();
async function main() {
  const prospectRole = await prisma.role.create({
    data: {
      name: RoleName.Prospect,
      quality: " ",
    },
  });

  const studentRole = await prisma.role.create({
    data: {
      name: RoleName.Student,
      quality: " ",
    },
  });

  const trainerRole = await prisma.role.create({
    data: {
      name: RoleName.Trainer,
      quality: " ",
    },
  });

  const AdminRole = await prisma.role.create({
    data: {
      name: RoleName.Admin,
      quality: " ",
    },
  });

  const roomCategory = await prisma.ressource_type.create({
    data: { name: "Salle", slug: "salle" },
  });

  const equipment = await prisma.ressource_type.create({
    data: { name: "Matériel", slug: "matériel" },
  });

  const indexCommentCategory = await prisma.comment_category.create({
    data: { name: "INDEX", is_unique: true },
  });

  fs.writeFile(
    "./src/utils/index.CommentCategory.json",
    JSON.stringify(
      { INDEX_COMMENT_CATEGORY: indexCommentCategory.id },
      null,
      2,
    ),
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("index file written successfully");
      }
    },
  );

  const admin = await prisma.person.create({
    data: {
      first_name: "ADMIN",
      last_name: "ADMIN",
      email: "cucchiaraquentin@gmail.com",
      role_id: AdminRole.id,
      password: await argon.hash("root"),
    },
  });

  const adminComment = await prisma.comment.create({
    data: {
      entity_id: admin.id,
      entity_type: EntityType.PERSON,
      title: "INDEX",
      content: "INDEX",
      category_id: indexCommentCategory.id,
    },
  });

  const ressourcePC = await prisma.ressource.create({
    data: {
      name: "PC",
      type_id: equipment.id,
      price: 300,
    },
  });

  const ressourcePCComment = await prisma.comment.create({
    data: {
      entity_id: ressourcePC.id,
      entity_type: EntityType.RESSOURCE,
      title: "INDEX",
      content: "INDEX",
      category_id: indexCommentCategory.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
