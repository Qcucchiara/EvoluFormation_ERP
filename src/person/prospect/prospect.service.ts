import { ForbiddenException, Injectable } from "@nestjs/common";
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
      const existingProspect = await this.prisma.person.findFirst({
        where: {
          OR: [{ email: dto.email }, { phone: dto.phone }],
        },
      });
      if (existingProspect) {
        //Peut être à modifier la logique
        throw new ForbiddenException("Prospect déja existant");
      }
      const role_id = await this.prisma.role.findUnique({
        where: { name: RolePerson.PROSPECT },
      });
      if (!role_id || !role_id.id) {
        //Erreur serveur (erreur de dev)
        throw new ForbiddenException("role non trouver");
      }
      // TODO trouver et verifier si l'entreprise existe
      // TODO faire le type entreprise auto entrepreneur etc
      // TODO faire les commentaires entité
      const data = await this.prisma.person.create({
        data: {
          first_name: dto.first_name,
          last_name: dto.last_name,
          email: dto.email,
          civility: dto.civility,
          phone: dto.phone,
          // type: dto.type,
          //company: dto.company????
          city: dto.city,
          street: dto.street,
          postal_code: dto.postal_code,
          role_id: role_id.id,
        },
      });
      return returnResponse(res, "Prospect crée avec succès", data);
      // return res
      //   .status(res.statusCode)
      //   .json({ message: "Prospect crée avec succès", statusCode: 201 });
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
      return returnResponse(res, "La liste de Prospects à été envoyé ", data);
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
      return returnResponse(
        res,
        "La liste de Prospects banni à été envoyé ",
        data,
      );
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
        return returnResponse(res, "Prospects trouver ", existingProspect);
      }
      throw new ForbiddenException("Prospect non trouver");
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
      return returnResponse(res, "Le prospect à été modifier ", data);
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
      return returnResponse(res, "Modification effectuer", data);
    } catch (error) {
      return returnError(res, error);
    }
  }
  async remove(id: string, res: Response) {
    try {
      const existingProspect = await this.prisma.person.findUnique({
        where: { id: id },
      });
      if (existingProspect) {
        await this.prisma.person.delete({ where: { id: id } });
        return returnResponse(res, "Prospects trouver ", existingProspect);
      }
      throw new ForbiddenException("Prospect non trouvé");
    } catch (error) {
      return returnError(res, error);
    }
  }
}
