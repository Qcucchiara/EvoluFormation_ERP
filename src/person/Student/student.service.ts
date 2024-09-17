import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { createStudentDto } from "../dto";
import { RolePerson } from "src/utils/const";

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: createStudentDto) {
    const roleStudent = await this.prisma.role.findUnique({
      where: {
        name: RolePerson.STUDENT,
      },
    });

    return this.prisma.person.create({
      data: { ...dto, role_id: roleStudent.id },
    });
  }

  findAll() {
    return `This action returns all person`;
  }

  findOne(id: string) {
    return `This action returns a #${id} person`;
  }

  update(id: string) {
    return `This action updates a #${id} person`;
  }

  remove(id: string) {
    return `This action removes a #${id} person`;
  }
}
