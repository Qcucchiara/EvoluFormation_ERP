import {
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateCompanyDto, LinkToPersonDTO } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { PrismaService } from "src/prisma/prisma.service";
import handleDeleteOnRestrictResponse from "src/utils/handleDeleteOnRestrictResponse";
import { Response } from "express";
import * as INDEX from "../utils/index.CommentCategory.json";
import returnResponse from "src/utils/responseFunctions/res.return";
import returnError from "src/utils/responseFunctions/error.return";

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCompanyDto, res: Response) {
    try {
      // si l'url est ajouté, faire une vérification qu'elle retourne une code HTTP correct ↙(de ce style là)
      // const truc = await fetch("https://hub.docker.com/_/help-world");
      // console.log(truc.status);
      const companyWithSameName = await this.prisma.company.findFirst({
        where: { name: dto.name },
      });
      console.log(INDEX);

      if (companyWithSameName) {
        throw new ForbiddenException("Nom déjà utilisé");
      }

      const companyWithSameSiret = await this.prisma.company.findFirst({
        where: { siret: dto.siret },
      });

      if (companyWithSameSiret !== null) {
        throw new ForbiddenException("SIRET déjà utilisé");
      }

      const data = await this.prisma.company.create({ data: { ...dto } });

      await this.prisma.comment.create({
        data: {
          company_id: data.id,
          title: "INDEX",
          content: "INDEX",
          category_id: INDEX.INDEX_COMMENT_CATEGORY,
        },
      });
      return returnResponse(res, "Entreprise créé avec succès", data);
    } catch (error) {
      return returnError(res, error);
    }
  }

  async linkToPerson(dto: LinkToPersonDTO, res: Response) {
    try {
      const company = await this.prisma.company.findUnique({
        where: { id: dto.company_id },
      });
      const person = await this.prisma.person.findUnique({
        where: { id: dto.person_id },
      });
      if (!company || !person) {
        throw new UnauthorizedException("Une des entrées n'existe pas");
      }
      const data = await this.prisma.company_has_person.create({
        data: { ...dto },
      });

      if (!data) {
        throw new ForbiddenException("La relation n'a pas été crée");
      }
      return returnResponse(res, "Relation créée avec succès", data);
    } catch (error) {
      return returnError(res, error);
    }
  }

  async findAll() {
    return await this.prisma.company.findMany();
  }

  findOne(id: string, res: Response) {
    try {
      // TODO: Chercher les dossiers associés à l'entreprise
      const data = this.prisma.company.findUnique({ where: { id: id } });
      //todo
      return returnResponse(res, "La liste Entreprise à été envoyé", data);
    } catch (error) {
      return returnError(res, error);
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
      return returnResponse(
        res,
        "La liste de modules a été envoyé",
        updatedCompany,
      );
    } catch (error) {
      return returnError(res, error);
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
      return returnResponse(res, "Entreprise supprimée avec succès", data);
    } catch (error) {
      return returnError(res, error);

      // const content = await handleDeleteOnRestrictResponse(
      //   this.prisma,
      //   id,
      //   "company",
      //   ["company_has_contact", "comment"],
      //   // true,
      // );

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
