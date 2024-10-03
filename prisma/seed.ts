import { PrismaClient } from "@prisma/client";
import * as argon from "argon2";
import { RolePerson } from "../src/utils/const";
const prisma = new PrismaClient();
async function main() {
  const prospectRole = await prisma.role.create({
    data: {
      name: RolePerson.PROSPECT,
      quality: " ",
    },
  });

  const studentRole = await prisma.role.create({
    data: {
      name: RolePerson.STUDENT,
      quality: " ",
    },
  });

  const trainerRole = await prisma.role.create({
    data: {
      name: RolePerson.TRAINER,
      quality: " ",
    },
  });

  const AdminRole = await prisma.role.create({
    data: {
      name: RolePerson.ADMIN,
      quality: " ",
    },
  });

  const admin = await prisma.person.create({
    data: {
      first_name: "ADMIN",
      last_name: "ADMIN",
      email: "cucchiaraquentin@gmail.com",
      role_id: AdminRole.id,
      password: await argon.hash("root"),
    },
  });

  const roomCategory = await prisma.ressource_type.create({
    data: { name: "Salle", slug: "salle" },
  });

  const equipment = await prisma.ressource_type.create({
    data: { name: "Matériel", slug: "matériel" },
  });

  const ressourcePC = await prisma.ressource.create({
    data: {
      name: "PC",
      type_id: equipment.id,
      price: 300,
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
