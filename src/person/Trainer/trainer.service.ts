import { ForbiddenException, Injectable } from "@nestjs/common";
import { createTrainerDTO } from "../dto/create-trainer.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { RolePerson } from "src/utils/const";
import { updateTrainerDTO } from "../dto/update-trainer.dto";
import { Response } from "express";

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
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Le formateur est enregistré.",
        data: data,
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

  async findAll() {
    try {
      const trainerRole = await this.prisma.role.findFirst({
        where: {
          name: RolePerson.TRAINER,
        },
      });
      return await this.prisma.person.findMany({
        where: { role_id: trainerRole.id },
      });
    } catch (error) {
      console.log("ERROR: " + error.message);

      return error;
    }
  }

  async findOne(id: string) {
    try {
      const existingProspect = await this.prisma.person.findUnique({
        where: { id: id },
      });
      if (existingProspect) {
        delete existingProspect.role_id;
        return existingProspect;
      }
      throw new ForbiddenException("Prospect non trouver");
    } catch (error) {
      console.log("ERROR: " + error.message);

      return error;
    }
  }

  async update(id: string, dto: updateTrainerDTO) {
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
      await this.prisma.person.update({ where: { id: id }, data: { ...dto } });

      return { message: "Modification effectuée", statusCode: "200" };
    } catch (error) {
      console.log("ERROR: " + error.message);

      return error;
    }
  }

  async remove(id: string) {
    try {
      const existingTrainer = await this.prisma.person.findUnique({
        where: { id: id },
      });
      if (existingTrainer) {
        await this.prisma.person.delete({ where: { id: id } });
        return { message: "Formateur supprimé", statusCode: 200 };
      }
      throw new ForbiddenException("Formateur non trouvé");
    } catch (error) {
      console.log("ERROR: " + error.message);

      return error;
    }
  }
}
