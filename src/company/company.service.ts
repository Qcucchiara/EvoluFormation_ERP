import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { PrismaService } from "src/prisma/prisma.service";
import handleDeleteOnRestrictResponse from "src/utils/handleDeleteOnRestrictResponse";

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
      if (companyWithSameName || companyWithSameName.id) {
        throw new ForbiddenException("Nom déjà utilisé");
      }
      if (dto.siret) {
        const companyWithSameSiret = await this.prisma.company.findFirst({
          where: { siret: dto.siret },
        });
        if (companyWithSameSiret || companyWithSameSiret.id) {
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
      const company = await this.prisma.company.findUnique({
        where: { id: id },
      });

      if (!company) {
        throw new NotFoundException(
          "L'entreprise n'a pas été trouvé dans la base de données.",
        );
      }

      return await this.prisma.company.delete({ where: { id: id } });
    } catch (error) {
      const content = await handleDeleteOnRestrictResponse(
        this.prisma,
        id,
        "company",
        ["company_has_contact", "comment"],
      );

      // return {
      //   message:
      //     "des conflits avec d'autres tableaux ont été trouvés. \n" +
      //     "Veuillez corriger les contraintes avant de recommencer.",
      //   content: content,
      //   statusCode: 409,
      // };
    }
  }
}
