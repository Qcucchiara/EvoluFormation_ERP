import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { createProspectDto } from "../dto";
import { Role, RolePerson } from "src/utils/const";

@Injectable()
export class ProspectService {
  constructor(private prisma: PrismaService) {}

  async insertProspect(dto: createProspectDto) {
    const existingProspect = await this.prisma.person.findFirst({
      where: {
        OR: [
          {
            email: dto.email,
          },
          {
            phone: dto.phone,
          },
        ],
      },
    });
    if (existingProspect) {
      throw new ForbiddenException("Prospect déja existant");
    }
    const role_id = await this.prisma.role.findUnique({
      where: { name: RolePerson.PROSPECT },
    });
    if (!role_id || !role_id.id) {
      //Erreur serveur
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
    return { message: "Prospect créer avec succès", status: 201 };
  }

  async updateProspect(dto: any) {}
}
