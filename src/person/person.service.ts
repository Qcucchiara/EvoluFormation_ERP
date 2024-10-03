import { Injectable } from "@nestjs/common";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  create(createPersonDto: CreatePersonDto) {
    return "This action adds a new person";
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
