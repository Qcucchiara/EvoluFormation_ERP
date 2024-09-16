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

  async create(dto: CreateCompanyDto) {
    try {
      // TODO: si l'url est ajouté, faire une vérification qu'elle retourne une code HTTP correct ↙(de ce style là)
      // const truc = await fetch("https://hub.docker.com/_/help-world");
      // console.log(truc.status);
      const companyWithSameName = await this.prisma.company.findFirst({
        where: { name: dto.name },
      });
      if (companyWithSameName.id) {
        throw new ForbiddenException("Nom déjà utilisé");
      }
      if (dto.siret) {
        const companyWithSameSiret = await this.prisma.company.findFirst({
          where: { siret: dto.siret },
        });
        if (companyWithSameSiret.id) {
          throw new ForbiddenException("SIRET déjà utilisé");
        }
      }
      await this.prisma.company.create({ data: { ...dto } });
      return { message: "entreprise crée avec succès", statusCode: 201 };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  findAll() {
    try {
      return this.prisma.company.findMany();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  findOne(id: string) {
    try {
      // TODO: Chercher les dossiers associés à l'entreprise
      return this.prisma.company.findUnique({ where: { id: id } });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async update(id: string, dto: UpdateCompanyDto) {
    try {
      if (dto.name) {
        const companyWithSameName = await this.prisma.company.findFirst({
          where: { AND: [{ name: dto.name }, { id: { not: id } }] },
        });
        if (companyWithSameName.id) {
          throw new ForbiddenException("Nom déjà utilisé");
        }
      }
      if (dto.siret) {
        const companyWithSameSiret = await this.prisma.company.findFirst({
          where: { AND: [{ siret: dto.siret }, { id: { not: id } }] },
        });
        if (companyWithSameSiret.id) {
          throw new ForbiddenException("SIRET déjà utilisé");
        }
      }
      const updatedCompany = await this.prisma.company.update({
        where: { id: id },
        data: { ...dto },
      });
      return { message: null, content: updatedCompany, statusCode: 200 };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.company.delete({ where: { id: id } });
    } catch (error) {
      console.log(
        "les conflits possibles sont les commentaires, \net les contacts de l'entreprise",
      );
      const restrictedDeleteComments = await this.prisma.comment.findMany({
        where: { company_id: id },
      });
      const restrictedDeleteContacts =
        await this.prisma.company_has_contact.findMany({
          where: { company_id: id },
        });
      return {
        message:
          "des conflits avec d'autres tableaux ont été trouvés. \n" +
          "Veuillez corriger les contraintes avant de recommencer.",
        content: {
          Comments: restrictedDeleteComments,
          Contacts: restrictedDeleteContacts,
        },
        statusCode: 409,
      };
    }
  }
}

try {
} catch (error) {
  try {
  } catch (e) {}
}
