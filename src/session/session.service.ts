import { Injectable, NotFoundException } from "@nestjs/common";
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
  async create(dto: CreateSessionDto, res: Response) {
    try {
      const newSession = new this.session(dto);
      const data = await newSession.save();
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Le dossier a été correctement créée",
        data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);
      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        error: { error: "Database connection error" },
      });
    }
  }

  findAll() {
    return this.session.find().exec();
  }

  async findOne(id: string) {
    try {
      return await this.session.findById(id).exec();
    } catch (error) {
      throw new NotFoundException("Not found");
    }
  }

  async update(id: string, dto: UpdateSessionDto) {
    try {
      await this.session.findById(id).exec();
      return await this.session.findByIdAndUpdate(id, dto).exec();
    } catch (error) {
      throw new NotFoundException("Not found");
    }
  }

  async remove(id: string) {
    const existingSession = await this.session.findById(id).exec();
    if (!existingSession) {
      throw new NotFoundException("Not found");
    }
    return await this.session.findByIdAndDelete(id).exec();
  }
}
