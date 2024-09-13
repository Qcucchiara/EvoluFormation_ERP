import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  create(dto) {
    return this.prisma.person.create({ data: { ...dto } });
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
