import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateCompanyDto) {
    // TODO: si l'url est ajouté, faire une vérification qu'elle retourne une code HTTP correct ↙(de ce style là)
    // const truc = await fetch("https://hub.docker.com/_/help-world");
    // console.log(truc.status);
    const CompanyWithSameName = this.prisma.company.findFirst({
      where: { name: dto.name },
    });
    if (CompanyWithSameName) {
      throw new ForbiddenException();
    } else {
      return this.prisma.company.create({ data: { ...dto } });
    }
  }

  findAll() {
    return this.prisma.company.findMany();
  }

  findOne(id: string) {
    // TODO: Chercher les dossiers associés à l'entreprise
    return this.prisma.company.findUnique({ where: { id: id } });
  }

  update(id: string, dto: UpdateCompanyDto) {
    return this.prisma.company.update({ where: { id: id }, data: { ...dto } });
  }

  remove(id: string) {
    return this.prisma.company.delete({ where: { id: id } });
  }
}
