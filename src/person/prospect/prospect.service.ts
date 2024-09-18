import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { createProspectDto, updateProspectDto } from "../dto";
import { RolePerson } from "src/utils/const";

@Injectable()
export class ProspectService {
  constructor(private prisma: PrismaService) {}

  async create(dto: createProspectDto) {
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
      await this.prisma.person.create({
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
      return { message: "Prospect crée avec succès", statusCode: 201 };
    } catch (error) {
      return error;
    }
  }

  async update(id: string, dto: updateProspectDto) {
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
      await this.prisma.person.update({
        where: { id: id },
        data: { ...dto },
      });

      return { message: "Modification effectuée", statusCode: "200" };
    } catch (error) {
      return error;
    }
  }
  async findAll() {
    try {
      const prospectRole = await this.prisma.role.findFirst({
        where: {
          name: RolePerson.PROSPECT,
        },
      });
      return await this.prisma.person.findMany({
        where: { role_id: prospectRole.id },
      });
    } catch (error) {
      return error;
    }
  }
  async remove(id: string) {
    try {
      const existingProspect = await this.prisma.person.findUnique({
        where: { id: id },
      });
      if (existingProspect) {
        await this.prisma.person.delete({ where: { id: id } });
        return { message: "Prospect supprimé", statusCode: 200 };
      }
      throw new ForbiddenException("Prospect non trouvé");
    } catch (error) {
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
      return error;
    }
  }
}
