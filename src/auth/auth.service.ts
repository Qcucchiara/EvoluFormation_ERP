import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
// import { SigninDto, SignupDto } from './dto';
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RolePerson } from "src/utils/const";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  // async signup(dto) {
  //   const exisingUser = await this.prisma.person.findUnique({
  //     where: {
  //       email: dto.email,
  //     },
  //   });
  //   if (exisingUser) {
  //     throw new ForbiddenException("Email already taken");
  //   }

  //   const hash = await argon.hash(dto.password);

  //   const user = await this.prisma.person.create({
  //     data: {
  //       email: dto.email,
  //       password: hash,
  //       first_name: dto.name,
  //     },
  //   });
  //   return this.signToken(user.id);
  // }

  async signin(dto) {
    const roleTrainer = await this.prisma.role.findUnique({
      where: { name: RolePerson.TRAINER },
    });

    const roleAdmin = await this.prisma.role.findUnique({
      where: { name: RolePerson.ADMIN },
    });

    const user = await this.prisma.person.findUnique({
      where: {
        email: dto.email,
        OR: [{ role_id: roleTrainer.id }, { role_id: roleAdmin.id }],
      },
    });
    if (!user) {
      throw new ForbiddenException("Identifiants incorrects");
    }

    const isValidPassword = await argon.verify(user.password, dto.password);
    if (!isValidPassword) {
      throw new ForbiddenException("Identifiants incorrects");
    }
    return this.signToken(user.id);
  }

  async signToken(userId: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
    };

    const secret = this.config.get("JWT_SECRET");
    const token = await this.jwt.signAsync(payload, {
      expiresIn: "1d",
      secret: secret,
    });

    return {
      access_token: token,
    };
  } //TODO: faire le truc avec express et "res"
}
