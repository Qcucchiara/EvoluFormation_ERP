import { Injectable } from "@nestjs/common";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { RolePerson } from "src/utils/const";

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  async create(createPersonDto) {
    const AdminRole = await this.prisma.role.findUnique({
      where: { name: RolePerson.ADMIN },
    });

    return this.prisma.person.create({
      data: {
        first_name: "ADMIN",
        last_name: "ADMIN",
        email: "contact@evoluformation.com",
        role_id: AdminRole.id,
        password: await argon.hash("root"),
      },
    });
  }

  findAll() {
    return this.prisma.person.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
