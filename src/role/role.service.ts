import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateRoleDto) {
    return this.prisma.role.create({ data: { ...dto } });
  }

  async findAll() {
    return await this.prisma.role.findMany();
  }

  findOne(id: string) {
    return this.prisma.role.findUnique({ where: { id: id } });
  }

  // update(id: string, dto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  remove(id: string) {
    return this.prisma.role.delete({ where: { id: id } });
  }
}
