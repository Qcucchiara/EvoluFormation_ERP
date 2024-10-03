import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { createStudentDto, updateStudentDto } from "../dto";
import { RolePerson } from "src/utils/const";

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: createStudentDto) {
    try {
      const existingStudent = await this.prisma.person.findFirst({
        where: {
          OR: [{ email: dto.email }, { phone: dto.phone }],
        },
      });
      if (existingStudent) {
        throw new ForbiddenException("Étudiant déja éxistant");
      }
      const roleStudent = await this.prisma.role.findUnique({
        where: {
          name: RolePerson.STUDENT,
        },
      });

      return this.prisma.person.create({
        data: { ...dto, role_id: roleStudent.id },
      });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const roleStudent = await this.prisma.role.findUnique({
      where: {
        name: RolePerson.STUDENT,
      },
    });
    return this.prisma.person.findMany({ where: { role_id: roleStudent.id } });
  }

  async findOne(id: string) {
    try {
      const existingStudent = await this.prisma.person.findUnique({
        where: {
          id: id,
        },
        include: {
          Role: true,
        },
      });
      if (existingStudent) {
        delete existingStudent.Role.id;
        delete existingStudent.role_id;
        return existingStudent;
      }
      throw new ForbiddenException("Étudiant non trouver");
    } catch (error) {
      return error;
    }
  }

  async update(id: string, dto: updateStudentDto) {
    try {
      const existingStudent = await this.prisma.person.findFirst({
        where: { id: id },
      });
      if (!existingStudent || !existingStudent.id) {
        throw new ForbiddenException("Étudiant non trouver");
      }
      if (dto.email) {
        const isEmailUsed = await this.prisma.person.findFirst({
          where: { email: dto.email },
        });
        if (isEmailUsed && isEmailUsed.email !== existingStudent.email) {
          throw new ForbiddenException("Email déja utiliser!");
        }
      }
      if (dto.phone) {
        const isPhoneUsed = await this.prisma.person.findFirst({
          where: {
            phone: dto.phone,
          },
        });
        if (isPhoneUsed) {
          throw new ForbiddenException("Téléphone déja utiliser!");
        }
      }
      await this.prisma.person.update({
        where: { id: id },
        data: { ...dto },
      });
      return { message: "Modification effectuer", statusCode: "200" };
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const existingStudent = await this.prisma.person.findUnique({
        where: { id: id },
      });
      if (existingStudent) {
        await this.prisma.person.delete({ where: { id: id } });
        return { message: "Étudiant supprimer", statusCode: 200 };
      }
      throw new ForbiddenException("Étudiant non trouver");
    } catch (error) {
      return error;
    }
  }
}
