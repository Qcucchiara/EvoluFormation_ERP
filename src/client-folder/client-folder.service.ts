import { Injectable } from "@nestjs/common";
import { CreateClientFolderDto } from "./dto/create-client-folder.dto";
import { UpdateClientFolderDto } from "./dto/update-client-folder.dto";
import { InjectModel } from "@nestjs/mongoose";
import { ClientFolder } from "src/schemas/ClientFolder.schema";
import { Document, Model } from "mongoose";

@Injectable()
export class ClientFolderService {
  constructor(
    @InjectModel(ClientFolder.name)
    private clientFolder: Model<ClientFolder & Document>,
  ) {}

  async create(dto, res) {
    try {
      // Je crois qu'il y a qu'un seul dossier par clients
      // Tentative de correction de l'erreur juste au dessus avec un changement de compagnyId => person_has_compagnyId dans le dto
      const newFolder = new this.clientFolder(dto);
      const data = await newFolder.save();
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

  async findAll() {
    try {
      return this.clientFolder.find().exec();
    } catch (error) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} clientFolder`;
  }

  update(id: number, updateClientFolderDto: UpdateClientFolderDto) {
    return `This action updates a #${id} clientFolder`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientFolder`;
  }
}
