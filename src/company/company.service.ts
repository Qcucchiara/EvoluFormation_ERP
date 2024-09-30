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
import { Response } from "express";

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCompanyDto, res: Response) {
    try {
      // TODO: si l'url est ajouté, faire une vérification qu'elle retourne une code HTTP correct ↙(de ce style là)
      // const truc = await fetch("https://hub.docker.com/_/help-world");
      // console.log(truc.status);
      const companyWithSameName = await this.prisma.company.findFirst({
        where: { name: dto.name },
      });

      if (companyWithSameName) {
        throw new ForbiddenException("Nom déjà utilisé");
      }

      const companyWithSameSiret = await this.prisma.company.findFirst({
        where: { siret: dto.siret },
      });

      if (companyWithSameSiret !== null) {
        throw new ForbiddenException("SIRET déjà utilisé");
      }

      await this.prisma.company.create({ data: { ...dto } });

      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Entreprise créé avec succès",
        // data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);

      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        // error: { error: "Database connection error" },
      });
    }
  }

  async findAll(res: Response) {
    try {
      return await this.prisma.company.findMany();
    } catch (error) {
      console.log("ERROR: " + error.message);

      return error;
    }
  }

  findOne(id: string, res: Response) {
    try {
      // TODO: Chercher les dossiers associés à l'entreprise
      return this.prisma.company.findUnique({ where: { id: id } });
    } catch (error) {
      console.log("ERROR: " + error.message);

      return error;
    }
  }

  async update(id: string, dto: UpdateCompanyDto, res: Response) {
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
      // return { message: null, content: updatedCompany, statusCode: 200 };
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "La liste de modules a été envoyé",
        data: updatedCompany,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);

      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        // error: { error: "Database connection error" },
      });
    }
  }

  async remove(id: string, res: Response) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id: id },
      });

      if (!company) {
        throw new NotFoundException(
          "L'entreprise n'a pas été trouvé dans la base de données.",
        );
      }

      const data = await this.prisma.company.delete({ where: { id: id } });

      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Entreprise supprimée avec succès",
        data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);

      const content = await handleDeleteOnRestrictResponse(
        this.prisma,
        id,
        "company",
        ["company_has_contact", "comment"],
        // true,
      );

      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message ? error.message : "Unexpected error",
        error: content,
      });

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
