import { ForbiddenException, Injectable } from "@nestjs/common";
import { createTrainerDTO } from "../dto/create-trainer.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { RolePerson } from "src/utils/const";
import { updateTrainerDTO } from "../dto/update-trainer.dto";
import { Response } from "express";
import returnResponse from "src/utils/responseFunctions/res.return";
import returnError from "src/utils/responseFunctions/error.return";

@Injectable()
export class TrainerService {
  constructor(private prisma: PrismaService) {}

  async create(dto: createTrainerDTO, res: Response) {
    try {
      const existingTrainer = await this.prisma.person.findFirst({
        where: {
          OR: [{ email: dto.email }, { phone: dto.phone }],
        },
      });
      if (existingTrainer) {
        throw new ForbiddenException("Formateur déja existant");
      }
      const trainerRole = await this.prisma.role.findUnique({
        where: { name: RolePerson.TRAINER },
      });
      if (!trainerRole || !trainerRole.id) {
        //Erreur serveur (erreur de dev)
        throw new ForbiddenException("role non trouvé");
      }
      // TODO: Créer une entrée dans la table Module_has_trainer pour chaque module_id de l'array module_ids
      const data = await this.prisma.person.create({
        data: {
          first_name: dto.first_name,
          last_name: dto.last_name,
          email: dto.email,
          phone: dto.phone,
          role_id: trainerRole.id,
        },
      });
      return returnResponse(res, "Formateur créé.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }

  async findAll(res: Response) {
    try {
      const trainerRole = await this.prisma.role.findFirst({
        where: {
          name: RolePerson.TRAINER,
        },
      });

      const data = await this.prisma.person.findMany({
        where: { role_id: trainerRole.id },
      });
      return returnResponse(res, "La list Formateur à été envoyé.", data);
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
        return returnResponse(
          res,
          "Le formateur à été envoyé.",
          existingProspect,
        );
      }
      throw new ForbiddenException("Prospect non trouver");
    } catch (error) {
      return returnError(res, error);
    }
  }

  async update(id: string, dto: updateTrainerDTO, res: Response) {
    try {
      const existingTrainer = await this.prisma.person.findUnique({
        where: { id: id },
      });
      if (!existingTrainer.id) {
        throw new ForbiddenException("Ce formateur n'existe pas");
      }
      if (dto.email) {
        const isEmailUsed = await this.prisma.person.findFirst({
          where: { email: dto.email },
        });
        if (isEmailUsed && isEmailUsed.email !== dto.email) {
          throw new ForbiddenException("Email déja utilisé!");
        }
      }
      if (dto.phone) {
        const isPhoneUsed = await this.prisma.person.findFirst({
          where: {
            phone: dto.phone,
          },
        });
        if (isPhoneUsed && isPhoneUsed.phone !== dto.phone) {
          throw new ForbiddenException("Téléphone déja utilisé!");
        }
      }
      const data = await this.prisma.person.update({
        where: { id: id },
        data: { ...dto },
      });
      return returnResponse(res, "Le formateur est enregistré.", data);
    } catch (error) {
      return returnError(res, error);
    }
  }

  async remove(id: string, res: Response) {
    try {
      const existingTrainer = await this.prisma.person.findUnique({
        where: { id: id },
      });
      if (existingTrainer) {
        const data = await this.prisma.person.delete({ where: { id: id } });
        return returnResponse(res, "Le formateur est enregistré.", data);
      }
      throw new ForbiddenException("Formateur non trouvé");
    } catch (error) {
      return returnError(res, error);
    }
  }
}
