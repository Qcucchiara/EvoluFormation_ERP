import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { createProspectDto, updateProspectDto } from "../dto";
import { RolePerson } from "src/utils/const";
import { Response } from "express";
import returnResponse from "src/utils/responseFunctions/res.return";
import returnError from "src/utils/responseFunctions/error.return";
@Injectable()
export class ProspectService {
  constructor(private prisma: PrismaService) {}
  async create(dto: createProspectDto, res: Response) {
    try {
      const existingEmail = await this.prisma.person.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (existingEmail) {
        //Peut être à modifier la logique
        throw new ForbiddenException("Email déjà utilisé");
      }
      const existingPhone = await this.prisma.person.findUnique({
        where: {
          phone: dto.phone,
        },
      });
      if (existingPhone) {
        throw new ForbiddenException("Télphone déjà utilisé");
      }
      const role_id = await this.prisma.role.findUnique({
        where: { name: RolePerson.PROSPECT },
      });
      if (!role_id || !role_id.id) {
        //Erreur serveur (erreur de dev)
        throw new ForbiddenException("role non trouver");
      }
      // TODO faire les commentaires entité
      const data = await this.prisma.person.create({
        data: {
          civility: dto.civility,
          first_name: dto.first_name,
          last_name: dto.last_name,
          email: dto.email,
          phone: dto.phone,
          type: dto.type,
          city: dto.city,
          street: dto.street,
          postal_code: dto.postal_code,
          role_id: role_id.id,
        },
      });
      if (dto.siret && dto.company) {
        const existingCompany = await this.prisma.company.findUnique({
          where: {
            siret: dto.siret,
          },
        });
        if (!existingCompany) {
          const newCompany = await this.prisma.company.create({
            data: {
              name: dto.company,
              siret: dto.siret,
            },
          });
          await this.prisma.company_has_person.create({
            data: {
              company_id: newCompany.id,
              person_id: data.id,
            },
          });
        } else {
          await this.prisma.company_has_person.create({
            data: {
              company_id: existingCompany.id,
              person_id: data.id,
            },
          });
        }
      } else if (dto.company) {
        const newCompany = await this.prisma.company.create({
          data: {
            name: dto.company,
          },
        });
        await this.prisma.company_has_person.create({
          data: {
            person_id: data.id,
            company_id: newCompany.id,
          },
        });
      }

      return returnResponse(res, "Prospect crée avec succès", data);
    } catch (error) {
      return returnError(res, error);
    }
  }
  async findAll(res: Response) {
    try {
      const prospectRole = await this.prisma.role.findFirst({
        where: {
          name: RolePerson.PROSPECT,
        },
      });
      const data = await this.prisma.person.findMany({
        where: {
          AND: [{ role_id: prospectRole.id }, { is_blacklisted: false }],
        },
      });
      return returnResponse(res, "Prospects envoyés.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }
  async findAllBlacklist(res: Response) {
    try {
      const prospectRole = await this.prisma.role.findFirst({
        where: {
          name: RolePerson.PROSPECT,
        },
      });
      const data = await this.prisma.person.findMany({
        where: {
          AND: [{ role_id: prospectRole.id }, { is_blacklisted: true }],
        },
      });
      return returnResponse(res, "Prospects blacklistés envoyés.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }
  async findOne(id: string, res: Response) {
    try {
      const existingProspect = await this.prisma.person.findUnique({
        where: { id: id },
      });
      if (existingProspect) {
        delete existingProspect.role_id;
        return returnResponse(res, "Prospect envoyé.", existingProspect);
      }
      throw new ForbiddenException("Prospect non trouvé");
    } catch (error) {
      return returnError(res, error);
    }
  }
  async update(id: string, dto: updateProspectDto, res: Response) {
    try {
      const existingProspect = await this.prisma.person.findFirst({
        where: { id: id },
      });
      if (!existingProspect || !existingProspect.id) {
        throw new ForbiddenException("Ce prospect n'existe pas");
      }
      if (dto.email) {
        const isEmailUsed = await this.prisma.person.findFirst({
          where: { email: dto.email },
        });
        if (isEmailUsed) {
          throw new ForbiddenException("Email déja utilisé!");
        }
      }
      if (dto.phone) {
        const isPhoneUsed = await this.prisma.person.findFirst({
          where: {
            phone: dto.phone,
          },
        });
        if (isPhoneUsed) {
          throw new ForbiddenException("Téléphone déja utilisé!");
        }
      }
      const data = await this.prisma.person.update({
        where: { id: id },
        data: { ...dto },
      });
      return returnResponse(res, "Prospect modifié.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }
  async toggleBlacklist(id: string, res: Response) {
    try {
      const existingProspect = await this.prisma.person.findUnique({
        where: {
          id: id,
        },
        include: {
          Role: true,
        },
      });
      if (!existingProspect || !existingProspect.id) {
        throw new ForbiddenException("Ce prospect n'existe pas");
      }
      if (existingProspect.Role.name !== RolePerson.PROSPECT) {
        throw new ForbiddenException("Ce n'est pas un prospect");
      }
      const data = await this.prisma.person.update({
        where: {
          id: id,
        },
        data: {
          is_blacklisted: !existingProspect.is_blacklisted,
        },
      });
      return returnResponse(res, "Prospect modifié.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }
  async remove(id: string, res: Response) {
    try {
      const existingProspect = await this.prisma.person.findUnique({
        where: { id: id },
        include: {
          companies: true,
        },
      });
      if (existingProspect) {
        existingProspect.companies.map(async (prospectCompany) => {
          await this.prisma.company_has_person.delete({
            where: { id: prospectCompany.id },
          });
        });
        await this.prisma.person.delete({ where: { id: id } });
        return returnResponse(res, "Prospect supprimé.", existingProspect);
      }
      throw new ForbiddenException("Prospect non trouvé");
    } catch (error) {
      return returnError(res, error);
    }
  }
}
