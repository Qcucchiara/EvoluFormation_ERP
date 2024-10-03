// Importation des modules nécessaires de NestJS et des autres bibliothèques.
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

// Déclaration de la classe JwtStrategy comme étant injectable, ce qui permet à NestJS de la gérer comme une dépendance.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  // Le constructeur de la classe JwtStrategy, où les services ConfigService et PrismaService sont injectés.
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    // Appel du constructeur parent avec les options  suivantes :
    // - jwtFromRequest:  fonction pour récupérer le jwt d'une requête   avec la fonction
    //  ExtractJwt.fromAuthHeaderAsBearerToken() qui applique cette recherche dans le header, et indique que
    // que le format attendu est de forme Bearer token.
    // - secretOrKey: Sers à entrer la clef secrète pour déchiffrage
    // on utilise config pour récupérer la variable d'environnement JWT_SECRET comme clef
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("JWT_SECRET"),
    });
  }

  // Méthode appelée automatiquement pour valider la donnée contenu (payload) dans le JWT.
  async validate(payload: { sub: string; email: string }) {
    // Recherche de l'utilisateur dans la base de données par son id.
    const user = this.prisma.person.findUnique({
      //TODO: changer cette partie.
      where: {
        id: payload.sub,
      },
      select: {
        id: true,
        email: true,
        created_at: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
