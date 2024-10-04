import { Injectable } from "@nestjs/common";
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Session } from "src/schemas/Session.schema";
import { Model } from "mongoose";
import { Response } from "express";

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name)
    private session: Model<Session & Document>,
  ) {}
  async create(dto, res: Response) {
    try {
      // vérifier si le dossier existe ou pas. s'il exsite pas, le créer ou throw une error.
      const newSession = new this.session(dto);
      const data = await newSession.save();
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Le dossier a été correctement créée",
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

  findAll() {
    return `This action returns all session`;
  }

  findOne(id: string) {
    return `This action returns a #${id} session`;
  }

  update(id: string, dto) {
    return `This action updates a #${id} session`;
  }

  remove(id: string) {
    return `This action removes a #${id} session`;
  }
}
